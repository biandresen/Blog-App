# 🎭 DadJokes — Full-Stack Social Humor Platform

A production-ready full-stack dad joke platform built with:

- **React + TypeScript** (Frontend)
- **Node.js + Express + PostgreSQL (Prisma)** (Backend)

Deployed on a **Raspberry Pi**, fronted by **Nginx**, managed with **PM2**, and secured via **Cloudflare**.

This project demonstrates real-world full-stack architecture, feature computation systems, badge/leaderboard mechanics, and production deployment.

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

---

## ✨ Core Features

### 🌍 Public Users

- Browse published dad jokes
- View:
  - 👑 Joke of the Day
  - 🔥 Trending This Week
  - 🎭 Most Commented This Week
  - 💥 Fastest Growing (likes in 24h)
  - 🏆 Top Creator This Month
- View **Hall of Fame (Leaderboard)**
- Search jokes
- View user badges and streaks

---

### 🔐 Registered Users (USER role)

- Register / Login
- Acceptence of terms required
- JWT Authentication:
  - Short-lived access token
  - HTTP-only refresh token
- Create jokes and comments
- Edit / Delete own jokes and comments
- Save drafts
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

---

### 👑 Admin Users

- Recompute featured rankings
- Moderate users
- Moderate jokes and comments
- Activate / deactivate users (soft delete)
- Secure admin-only feature endpoints

---

## 🏆 Gamification System

DadJokes includes a deterministic + database-backed feature system.

### Featured Systems

| Feature | Logic |
|----------|-------|
| 👑 Joke of the Day | Deterministic daily selection (no repeat two days in a row) |
| 🔥 Trending Week | Most likes in last 7 days |
| 🎭 Most Commented Week | Most comments in last 7 days |
| 💥 Fastest Growing | Most likes in last 24 hours |
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

---

### Authentication & Authorization

- Role-based access control (USER / ADMIN)
- Ownership checks
- Secure refresh-token cookies
- Protected admin feature endpoints

---

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
- Production deployment on constrained hardware
- Security-focused development

---

## 📌 Possible Future Improvements

- Caching
- WebSocket live leaderboard updates and live chat

---

## 👤 Author

**Birger**  
Full-Stack Developer  

**Stack:**  
JavaScript · TypeScript · Node.js · Express · React · PostgreSQL · Prisma · Nginx · PM2 · Cloudflare
