# Pundad

Pundad is a full-stack social dad-joke platform where users can browse, publish, search, like, comment on, and compete around jokes in Norwegian and English.

The project is built as a JAMstack-style application with separate frontend and backend repositories:

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, Prisma
- Database: PostgreSQL
- Runtime: Nginx, PM2, Cloudflare, Raspberry Pi hosting

Live app: https://pundad.app

API documentation: https://documenter.getpostman.com/view/44451419/2sB2qgeJBS

## Project Purpose

This project was built as a capstone full-stack application. It demonstrates practical frontend engineering, REST API design, authentication, relational data modeling, background jobs, moderation workflows, multilingual content handling, and production deployment.

At a high level, Pundad is a community platform with three main areas:

- Public joke discovery for visitors
- Authenticated creation and profile tools for users
- Admin tools for user management, moderation, and operational control

## Core Features

### Public Users

- Browse published jokes
- View a single joke page
- Search jokes by title, body, comments, and tags
- Browse popular jokes
- Get a random joke
- View the daily joke
- View featured joke categories:
  - Joke of the Day
  - Trending This Week
  - Most Commented This Week
  - Fastest Growing
  - Top Creator This Month
- View the Hall of Fame leaderboard
- Switch between Norwegian and English
- Read legal pages and community rules
- Submit contact messages

### Registered Users

- Register with terms acceptance
- Verify email before logging in
- Log in with JWT-based authentication
- Stay signed in through refresh-token cookies
- Reset password by email
- Create jokes
- Save jokes as drafts
- Publish and unpublish jokes
- Edit and delete owned jokes
- Comment on jokes
- Edit and delete owned comments
- Like and unlike jokes
- View personal jokes and drafts
- Track daily joke streaks
- Earn and view badges
- Update profile details
- Upload one profile avatar; when a new avatar is uploaded, the previous avatar file is deleted from the uploads directory
- Request an email change verification
- Deactivate own account through soft deletion, which marks the account inactive and prevents future login

### Admin Users

- Search users by username or email
- Deactivate and reactivate users through soft deletion
- Manage moderation terms
- Activate, deactivate, edit, and delete moderation terms
- Reload the moderation cache
- Access admin-only backend operations through role-based authorization

## Multilingual Design

Pundad supports Norwegian and English as separate content spaces inside one application.

User accounts are shared globally, but content is language-scoped:

- Jokes belong to a language
- Tags are unique per language
- Featured jokes are computed per language
- Badge awards are tracked per language
- Leaderboard calculations are filtered per language
- The frontend sends the active language to the backend with `X-App-Language`

This makes the app behave like two community spaces sharing the same account system.

## Gamification

The backend computes and stores featured results instead of calculating everything only in the browser.

| Feature | Backend logic |
| --- | --- |
| Joke of the Day | Deterministic daily selection per language |
| Trending This Week | Most likes during the current week |
| Most Commented This Week | Most comments during the current week |
| Fastest Growing | Most likes during the last 24 hours |
| Top Creator This Month | User with the most published jokes this month |

Winning a featured category can award badges. The badge system stores both historical awards and currently active badges, which lets the UI show recent achievements while preserving long-term history.

The Hall of Fame leaderboard combines feature wins, likes received, comments received, and streak data into a weighted ranking.

## Authentication and Session Persistence

Pundad uses a short-lived access token together with a refresh token stored in an HTTP-only cookie.

When the app loads, the frontend attempts to restore the user's session by calling the backend refresh endpoint. If the refresh token is still valid, the backend issues a new access token, the frontend fetches the current user with `/user/me`, and the user remains logged in after a page reload.

Protected API calls are wrapped in a safe request helper. If a protected request fails because the access token has expired, the frontend asks the backend for a fresh access token and retries the original request once. If refresh fails, the app clears the local auth state and requires the user to log in again.

## Architecture Overview

```text
Browser
  -> React/Vite frontend
  -> Axios REST calls
  -> Express API
  -> Prisma ORM
  -> PostgreSQL

Background worker
  -> Scheduled featured computations
  -> Badge awards
  -> Product/job logs
```

Production traffic is served through Cloudflare and Nginx. The frontend is served as static assets, API traffic is proxied to the Express backend, and uploaded avatars are served from the backend/uploads path.

For the full system explanation, see [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md).

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify
- React Icons
- Context-based state for auth, user, language, theme, jokes, and moderation
- Custom pagination hook supporting paged and infinite-loading views
- Translation-driven UI for Norwegian and English

### Backend

- Node.js
- Express 5
- Prisma ORM
- PostgreSQL
- JWT access tokens
- HTTP-only refresh-token cookies
- Bcrypt password hashing
- Express Validator
- Helmet
- CORS
- HPP protection
- Rate limiting
- Multer and Sharp for avatar upload processing
- Nodemailer/Resend email delivery
- Pino structured logging
- Node Cron background jobs

### Infrastructure

- Raspberry Pi hosting
- Nginx reverse proxy and static file serving
- PM2 process management
- Cloudflare DNS/TLS/protection
- Separate PM2 processes for API server and background worker

## Repository Structure

```text
pundad-app/
  src/
    api/              API endpoint constants
    components/       Reusable UI components
    contexts/         Auth, user, language, jokes, theme, moderation state
    hooks/            Pagination, autosave, safe requests, UX helpers
    i18n/             Norwegian and English translations
    lib/              API clients, auth helpers, moderation helpers
    routes/           Page and layout routes
    types/            TypeScript domain types
    validators/       Frontend validation helpers
  docs/
    SYSTEM_DESIGN.md  Full project architecture notes
    testing/          Testing strategy and manual regression notes
```

The backend lives in a separate repository, `pundad-api`, with this shape:

```text
pundad-api/
  prisma/
    schema.prisma     Database schema
    migrations/       Database migration history
  src/
    app.js            Express app setup and middleware
    server.js         API process entry point
    controllers/      HTTP request handlers
    services/         Business logic and Prisma access
    routes/           REST route definitions
    middleware/       Auth, role, validation, upload, language, logging middleware
    jobs/             Scheduled featured computations
    validation/       Express Validator rules
```

## Local Development

Run the frontend and backend in separate terminals.

### Backend

From the backend repository:

```bash
npm install
npx prisma migrate dev
npm run dev
```

Optional worker process for scheduled feature computations:

```bash
npm run dev:worker
```

Backend development server:

```text
http://127.0.0.1:4001/api/v1
```

Required backend environment variables:

```text
DATABASE_URL
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
RESEND_API_KEY
EMAIL_FROM
EMAIL_REPLY_TO
CONTACT_ADMIN_EMAIL
CONTACT_BUG_EMAIL
CONTACT_FEATURE_EMAIL
CONTACT_SUGGESTION_EMAIL
CONTACT_FEEDBACK_EMAIL
```

### Frontend

From this frontend repository:

```bash
npm install
npm run dev
```

Frontend development server:

```text
http://127.0.0.1:5173
```

Frontend environment variables:

```text
VITE_API_BASE_URL=http://127.0.0.1:4001/api/v1
VITE_API_ORIGIN=http://127.0.0.1:4001
```

## Available Frontend Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Backend Processes

The backend PM2 ecosystem defines two production processes:

- `pundad-api`: Express HTTP API
- `pundad-worker`: scheduled background jobs for featured rankings

The API handles user requests. The worker computes daily jokes, weekly rankings, fastest-growing jokes, top creators, and related badge awards for each supported language.

## Security Highlights

- Access-token and refresh-token authentication
- Refresh tokens stored in HTTP-only cookies
- Session restore on page load through refresh-token validation
- Automatic access-token refresh and one-time retry for expired protected requests
- Passwords hashed with bcrypt
- Email verification before login
- Expiring password reset tokens
- Role-based authorization for admin routes
- Ownership middleware for user, joke, and comment updates
- Backend validation with Express Validator
- Frontend validation for faster feedback
- Database-backed moderation terms
- Backend moderation enforcement
- Rate limiting for auth, contact, profile, uploads, and read-heavy routes
- CORS allowlist
- Helmet security headers
- Avatar file type and size validation
- Sharp image processing and WebP output
- One-avatar-per-user storage: replacing an avatar removes the old file to keep the uploads directory small

## What This Project Demonstrates

- Full-stack feature ownership from UI to database
- REST API design with service-layer separation
- JWT authentication with refresh-token rotation
- Relational data modeling with Prisma
- Language-scoped data architecture
- Background job design
- Computed rankings and badge systems
- Admin and moderation workflows
- Production deployment with reverse proxy and process management
- Practical security and validation patterns

## Future Improvements

- Automated backend integration tests
- Frontend component and route tests
- End-to-end tests for auth, language separation, joke CRUD, and admin flows
- Redis cache for high-read ranking data
- Queue-based background processing
- Admin audit-log UI
- User content reporting workflow
- Live leaderboard updates
- More advanced moderation categories and severity levels
