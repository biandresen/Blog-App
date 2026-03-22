# 🎭 DadJokes — Full-Stack Social Humor Platform

A production-ready full-stack dad joke platform built with:

- **React + TypeScript** (Frontend)
- **Node.js + Express + PostgreSQL (Prisma)** (Backend)

Deployed on a **Raspberry Pi**, fronted by **Nginx**, managed with **PM2**, and secured via **Cloudflare**.

This project demonstrates real-world full-stack architecture, feature computation systems, badge/leaderboard mechanics, and production deployment.

The platform includes multilingual content support (Norwegian/English), JWT-based authentication, drafts and publishing workflows, featured ranking systems, badges, a Hall of Fame leaderboard, search with field-specific filters, avatar uploads, and an admin moderation dashboard backed by a database-driven moderation cache.

---

## 🚀 Live Demo

**URL:** https://bloggy-app.dev  
*(Hosted on Raspberry Pi with Cloudflare, Nginx, and PM2)*

---

## 🧠 Project Goals

- Build a community-driven joke platform
- Implement deterministic + computed feature ranking systems
- Design a badge and leaderboard architecture
- Apply production-grade security practices
- Operate a full-stack application on real infrastructure
- Demonstrate scalable backend service design
- Support multiple content languages with language-scoped data
- Build moderation workflows for both users and content
- Create admin tooling for operational control

---

## ✨ Core Features

## 🌐 Multilingual Content System

DadJokes supports language-scoped content for Norwegian and English.

This includes:

- Posts
- Tags
- Featured rankings
- Hall of Fame calculations
- Daily joke selection
- Search results
- UI translations

The app separates content by language so users browse and interact with the currently selected language version of the platform.

### 🌍 Public Users

- Browse language specific dad jokes
- View:
  - 👑 Joke of the Day
  - ⚡ Trending This Week
  - 🎭 Most Commented This Week
  - 🚀 Fastest Growing (likes in 24h)
  - 🏆 Top Creator This Month
  - All jokes
  - Single joke pages
  - Browse random jokes
  - Search jokes with filters for:
    - Title
    - Body
    - Comments
    - Tags
- View **Hall of Fame (Leaderboard)**
- View user badges and streaks (🔥)
- Switch between Norwegian and English content

---

### 🔐 Registered Users (USER role)

- Register / Login
- Acceptance of terms required
- JWT Authentication:
  - Short-lived access token
  - HTTP-only refresh token
- Create jokes in the selected language
- Create comments on published jokes
- Edit / Delete own jokes and comments
- Save jokes as drafts
- View own drafts
- View own unpublished draft pages
- Publish / Unpublish existing jokes
- Like jokes
- Build a **Daily Joke Streak**
- Earn badges:
  - Joke of the Day
  - Top Creator of the Month
  - Trending Week
  - Most Commented Week
  - Fastest Growing
  - Streak tiers
- View badge history
- Update profile:
  - Username
  - Email
  - Password
  - Avatar upload
  - Preferred language
---

### 👑 Admin Users

- Recompute featured rankings
- Activate / deactivate users (soft delete)
- Search users by username or email
- Manage moderation terms through an admin dashboard
- Create / edit / activate / deactivate / delete moderation terms
- Reload moderation cache
- Secure admin-only feature endpoints
---

## 🏆 Gamification System

DadJokes includes a deterministic + database-backed feature system.

### Featured Systems

| Feature | Logic |
|----------|-------|
| 👑 Joke of the Day | Deterministic daily selection (no repeat two days in a row) |
| ⚡ Trending Week | Most likes in last 7 days |
| 🎭 Most Commented Week | Most comments in last 7 days |
| 🚀 Fastest Growing | Most likes in last 24 hours |
| 🏆 Top Creator Month | Most published jokes in current month |

Each feature:

- Is computed server-side
- Persisted in `FeaturedPost`
- Awards badges via idempotent upsert logic
- Is concurrency-safe
- Can be triggered manually or via cron

---

### 🎖 Badge System

Two-layer architecture:

1. **BadgeAward** → historical record
2. **CurrentUserBadge** → currently active badges

Supports:

- Valid time windows
- Context (e.g., related postId)
- Priority-based primary badge display
- Badge stacking
- Streak tiers

---

### 🏛 Hall of Fame (Leaderboard)

Dynamic ranking system with selectable period:

- This week
- This month
- All-time

Ranking based on weighted score:

- Featured wins
- Likes received
- Daily streak

Spam-resistant (does not reward raw post count).

Includes:

- Avatar with primary badge
- Streak indicator
- Likes received
- Wins count

---

## 🛡 Security & Best Practices

### Backend Security

- Helmet (security headers)
- Strict CORS policy
- Rate limiting
- Input validation and sanitization
- Soft deletes
- Secure password hashing
- Expiring password reset tokens
- Image validation (byte-level)
- Image compression (Sharp)
- Database-backed moderation term system
- Server-side moderation cache
- Frontend + backend blocked-language checks
---

### Authentication & Authorization

- Role-based access control (USER / ADMIN)
- Ownership checks
- Secure refresh-token cookies
- Protected admin feature endpoints

---

## 🚨 Moderation System

DadJokes includes a moderation layer for safer community use.

### Content Moderation

- Frontend pre-submit moderation checks
- Backend moderation enforcement
- Obfuscation-aware blocked-term matching
- Moderation applied to:
  - Usernames
  - Joke titles
  - Joke bodies
  - Tags
  - Comments

### Moderation Operations

- Database-backed moderation terms
- Server-side moderation cache for performance
- Public client-safe moderation term loading
- Admin CRUD panel for moderation term management
- Manual cache reload support

## 🖼 Media Handling

- Multer (memory storage)
- Sharp (resize + WebP compression)
- Static file serving via Nginx
- Canonical public path: `/uploads/avatars/<filename>.webp`

---

## 🧱 Tech Stack

### Frontend

- React
- TypeScript
- Axios
- React Router
- Custom infinite-scroll pagination hook
- Component-based architecture
- React Toastify
- React Icons
- Context-based state for auth, user, language, and moderation
- i18n / translation-driven UI
- Responsive admin moderation dashboard

---

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT authentication
- Service-layer architecture
- Deterministic ranking algorithms
- Idempotent upsert patterns
- Database-backed moderation system
- In-memory moderation cache
- Language-scoped content architecture
  
---

### Infrastructure / DevOps

- Raspberry Pi (self-hosted production)
- PM2 (API + background processes)
- Nginx (reverse proxy + static serving)
- Cloudflare

---

## 🗂 Architecture Overview
- **Browser**
  - ↓
- **Cloudflare** (DNS, TLS, protection)
  - ↓
- **Nginx** (reverse proxy)
  - Serves React frontend
  - Serves `/uploads`
  - Proxies `/api` → Node.js
    - ↓
- **Express API**
  - ↓
- **PostgreSQL** (Prisma)

---

## ⚙ Background Jobs

Featured computations are:

- Idempotent
- Concurrency-safe
- Database-backed
- Cron-ready
- Admin-triggerable

Designed to scale toward queue-based processing if needed.

---

## 🧪 Observability & Operations

- PM2 process monitoring
- Centralized logs (PM2 + Nginx)
- Health endpoints
- Structured error handling
- Cloudflare analytics

---

## 📚 What This Project Demonstrates

- Full-stack ownership (frontend → backend → infrastructure)
- Authentication architecture
- Gamification systems design
- Badge + leaderboard architecture
- Multi-language application architecture
- Admin tooling and moderation workflows
- Search/filter system design
- Production deployment on constrained hardware
- Security-focused development
  
---

## 📌 Possible Future Improvements

- Redis or edge caching
- WebSocket live leaderboard updates and live chat
- Admin audit logs
- Moderation reports / flagged content workflow
- Email verification
- Smarter moderation categories and severity levels
- Queue-based background job processing

---

## 👤 Author

**Birger**  
Full-Stack Developer  

**Stack:**  
JavaScript · TypeScript · Node.js · Express · React · PostgreSQL · Prisma · Nginx · PM2 · Cloudflare
