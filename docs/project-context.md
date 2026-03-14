Project: DadJokes capstone fullstack app

Tech stack:
- Frontend: React + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL + Prisma
- Auth: access token + refresh token flow
- Deployment: Railway/backend already in use, production-style setup
- UI includes sidebars, header/navbar, profile/dashboard, joke pages, featured pages, legal pages

Core app concept:
- Users can register, login, manage profile
- Create, edit, delete jokes
- Save drafts and publish later
- Comment on jokes
- Like jokes
- View daily joke, random joke, popular jokes, all jokes, search
- Hall of Fame / badges / featured joke systems
- Admin page for admin users

Important architecture decisions:
- User/profile is shared globally across languages
- dailyJokeStreak is global across languages by choice
- Content is language-separated between NO and EN
- App behaves like two separate apps/sites for content, except shared user/profile
- Language implemented in backend, database schema, and frontend

Database / backend language architecture:
- Added Language enum with NO and EN
- language-aware models include content-related entities
- languageMiddleware resolves request language from frontend
- routes under /api/v1 use language middleware
- services/controllers were updated to respect language
- language isolation is important: NO content should not leak into EN and vice versa
- featured posts, tags, hall of fame, comments, likes, etc. were updated for language scoping
- streak remains global

Frontend language architecture:
- translations.ts contains NO and EN content
- LanguageContext provides current language and t()/tf()-style translation usage
- app language can come from localStorage, and user.preferredLanguage should be prioritized when logged in
- many pages/components already converted from hardcoded text to translations:
  - Home
  - About
  - Register
  - Login
  - ForgotPassword
  - ResetPassword
  - Profile
  - Admin
  - Drafts
  - MyJokes
  - NewJoke
  - Search
  - AllJokes
  - Popular
  - DailyJoke
  - RandomJoke
  - HallOfFame
  - featured pages
  - Navbar
  - Header
  - LeftSidebar / LeftSidebar2
  - RightSidebar
  - LegalMenu
  - UserMenu
  - MobileNavHint
  - Layout report modal/button
  - CommentForm
  - Comment
  - PostCard
  - AvatarWithBadges
  - Modal
  - legal pages (terms/privacy/cookies/rules)
- There may still be some untranslated strings or language bugs left

Current likely risk areas:
- frontend/backend contract mismatches after language changes
- places where old hardcoded text still exists
- language-specific filtering bugs in posts/comments/tags/featured/hall-of-fame
- user update/getMe behavior around preferredLanguage and currentBadges
- mobile/desktop nav interactions
- refresh token / access token flows after recent changes
- possible NO/EN leakage in edge cases

Testing goal:
I want a professional testing plan suitable for a capstone project and useful to discuss in interviews.

I want help with:
1. creating a testing strategy
2. making a manual test checklist
3. identifying the highest-risk areas first
4. deciding what should be manually tested vs automated
5. possibly setting up backend tests, frontend tests, and E2E tests
6. creating documentation like TESTING.md / BUG_LOG.md / regression checklist

Recommended testing priorities:
1. smoke test app boot, login, register, getMe, logout, refresh/session
2. verify NO/EN language separation for all content
3. test CRUD for posts, drafts, comments, profile
4. test rankings/featured/badges/hall of fame
5. test admin permissions and unauthorized access
6. test UX states, mobile behavior, untranslated text, edge cases

Important note:
Do not assume the language feature is bug-free. We should test now and fix issues as they appear, unless there is a hard blocker like app boot, auth, or language switch completely failing.