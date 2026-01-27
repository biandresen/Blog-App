# Bloggy — Full-Stack Blog Application

A production-ready full-stack blog application built with **React + TypeScript** on the frontend and **Node.js + Express + PostgreSQL (Prisma)** on the backend.

The application is fully deployed on a **Raspberry Pi**, fronted by **Nginx**, managed with **PM2**, and secured via **Cloudflare**.  
This project was built to demonstrate real-world full-stack development practices beyond local development.

---

## 🚀 Live Demo

**URL:** https://bloggy-app.dev  
*(Hosted on a Raspberry Pi with Cloudflare, Nginx, and PM2)*

---

## 🧠 Project Goals

- Build a **complete CRUD blog platform** with real authentication and authorization
- Apply **production-grade security practices**
- Handle **media uploads and optimization**
- Deploy and operate a full-stack app on **real infrastructure**
- Demonstrate architectural decision-making suitable for professional work

---

## ✨ Features

### Public (Non-authenticated users)
- Read published blog posts
- Read comments
- View popular posts (top 10 most liked)
- Search posts by:
  - title
  - body
  - tags
  - comments  
  (configurable via checkboxes)

---

### Authenticated Users (USER role)
- Register and log in
- JWT-based authentication:
  - short-lived **access token** (stored in app state)
  - long-lived **refresh token** (HTTP-only cookie)
- Create, edit, and delete:
  - posts
  - comments
- Write drafts and publish/unpublish posts
- Like posts
- Edit own profile:
  - username
  - email
  - password
  - avatar (profile picture)
- Upload avatar images:
  - processed and compressed on the backend
  - limited to **one avatar per user**
- Password reset via email:
  - expiring reset link (5 minutes)

---

### Admin Users (ADMIN role)
- Access admin dashboard
- Search for users
- Activate / deactivate users (soft delete)
- Delete other users’ posts and comments

---

### UI / UX
- Toggleable left and right side menus
- Toggle between:
  - full post view
  - compact “mini” post view
- Quick navigation bar on the “All Posts” page
- Responsive layout
- Hyperlink support:
  - URLs written in posts are converted to clickable anchor tags

---

## 🛡️ Security & Best Practices

### Backend Security
- HTTP security headers (Helmet)
- Input sanitization and validation
- Rate limiting
- Strict CORS configuration
- Soft deletes (no destructive user deletion)
- Secure password hashing
- Expiring password reset tokens
- Image type validation using byte-level detection
- Image compression and resizing with Sharp

### Authentication & Authorization
- Role-based access control (USER / ADMIN)
- Ownership checks:
  - users can modify their own content
  - admins can moderate all content
- Secure cookie handling for refresh tokens

---

## 🖼️ Media Handling
- Image uploads handled via:
  - Multer (memory storage)
  - Sharp (resize + WebP compression)
- Optimized for ARM (Raspberry Pi):
  - single-pass encoding
  - reduced WebP effort
- Uploaded files served directly by **Nginx**
- Canonical public paths: /uploads/avatars/<filename>.webp

---

## 🧱 Tech Stack

### Frontend
- React
- TypeScript
- Axios
- React Router
- Component-based architecture
- Built and served as static assets

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT authentication
- Multer + Sharp for uploads
- Nodemailer for password reset emails

### Infrastructure / DevOps
- Raspberry Pi (single-node deployment)
- PM2 (process manager)
- Nginx (reverse proxy + static file server)
- Cloudflare:
- DNS
- TLS
- security headers
- HTTPS with HTTP/2

---

## 🗂️ Architecture Overview
```
Browser
↓
Cloudflare (DNS, TLS, protection)
↓
Nginx (reverse proxy)
├─ Serves frontend (React build)
├─ Serves /uploads (static files)
└─ Proxies /api → Node.js
↓
Express API
↓
PostgreSQL (Prisma)
```

---

## 🧪 Observability & Operations

- PM2 process monitoring
- Centralized logs (PM2 + Nginx)
- Health endpoints
- Rate-limit headers for visibility
- Structured error handling
- Cloudflare analytics

---

## 📚 What This Project Demonstrates

- Full-stack ownership (frontend → backend → deployment)
- Real authentication and authorization flows
- Secure media upload pipelines
- Role-based permissions
- Production deployment on constrained hardware
- Clean separation of concerns
- Defensive programming practices

---

## 📌 Possible Future Improvements

- Background job queue for image processing
- WebSocket notifications
- Server-side rendering (SSR)
- Full-text search
- Pagination optimization
- Audit logging for admin actions

---

## 👤 Author

**Birger**  
Aspiring Full-Stack Developer  
**Stack:** JavaScript · TypeScript · Node.js · React · PostgreSQL


