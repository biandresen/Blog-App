1. Recommended testing strategy

Use a layered approach:

Layer 1: Smoke testing

Purpose: confirm the app is basically usable after major changes.

Test first:

frontend boots

backend boots

DB connection works

register works

login works

refresh/access token flow works

getMe works

logout works

language switch works

key pages render without crashing

This is your first gate. If smoke fails, do not continue into deeper feature testing until fixed.

Layer 2: High-risk integration testing

Purpose: test the areas most likely broken by your recent language architecture work.

Focus on:

frontend ↔ backend contract

language-aware endpoints

content isolation between NO and EN

shared user/profile behavior across both languages

auth-protected flows with language changes

This matters more than isolated unit tests right now because your current risk is mostly integration risk, not pure function logic.

Layer 3: Feature workflow testing

Purpose: verify real user flows.

Test workflows like:

register → login → create joke → save draft → publish → edit → delete

create comment → edit/delete if supported

like/unlike

search/filter/browse by language

daily/random/popular/all jokes

profile update including preferredLanguage

admin access and admin-only actions

Layer 4: UX and edge-case testing

Purpose: polish and catch capstone-quality issues.

Check:

loading states

empty states

error messages

untranslated strings

mobile navigation

modals

unauthorized states

stale UI after refresh

token expiry behavior

switching language mid-session

refresh on protected routes

Layer 5: Automated coverage

Purpose: protect core behavior from regressions.

For your project, automate these in this order:

backend integration tests

frontend component/integration tests for critical UI behavior

E2E tests for a few critical journeys

Do not try to automate everything. Automate the most expensive regressions.

2. Highest-risk areas first

Based on your snapshot, this is the order I would attack:

Priority 1 — Core boot/auth/session

Why:
If this fails, the app is not testable.

Test:

app load

register

login

token refresh after reload

getMe after reload

logout

protected routes when unauthenticated

expired/invalid token handling

Priority 2 — Language separation and shared-user rules

Why:
This is the biggest architecture change and easiest place to introduce subtle bugs.

Test:

create NO joke → confirm not visible in EN lists/search/featured/popular/random/etc.

create EN joke → confirm not visible in NO equivalents

comments follow correct language scoping

likes do not create weird cross-language leakage

tags/featured/hall-of-fame are properly scoped

user profile remains same across languages

streak remains shared across languages

preferredLanguage influences frontend correctly when logged in

Priority 3 — CRUD flows

Why:
These are your core value features and likely touch many layers.

Test:

create draft

edit draft

publish draft

create published joke directly

edit joke

delete joke

create comment

delete/edit comment if supported

profile update

Priority 4 — Derived systems

Why:
These often fail after data model changes.

Test:

popular jokes ranking

daily joke

random joke

hall of fame

badges/currentBadges

featured systems

admin dashboard data views

Priority 5 — UX and responsive behavior

Why:
Important for demo quality, but lower priority than correctness.

Test:

navbar/header/sidebar behavior on desktop/mobile

modal open/close

translated labels/buttons/errors

empty states

loading spinners/skeletons

error banners/messages

layout issues on smaller screens

3. What to test manually vs automate
Manual first

Manual testing is best for:

exploratory testing

untranslated text

layout/responsiveness

weird UX flows

multi-step content/language verification

checking real-world behavior across pages

Manual testing should cover:

language leakage checks

mobile nav/sidebar interactions

visual regressions

empty/loading/error states

admin UI behavior

edge cases in forms

Automate first

Automation is best for:

repeatable critical flows

API contract stability

regression-prone core logic

auth/session flows

language filtering rules at service/API level

Automate these first:

Backend

auth endpoints

getMe

refresh token flow

protected route access

post/joke CRUD with language scoping

comment CRUD with language scoping

list/search queries filtered by language

admin authorization

shared profile vs language-specific content rules

Frontend

LanguageContext behavior

components rendering translated strings from props/context

guarded UI rendering based on auth/admin state

form validation/error rendering

critical pages rendering expected states

E2E

register/login/logout

create NO joke and verify it appears only in NO

switch to EN and verify isolation

create draft → publish

update profile preferredLanguage

unauthorized user blocked from admin page

4. Practical test pyramid for this project

A good capstone-friendly version:

Backend tests

Use for:

services

controllers

API endpoints

DB-backed integration tests

Best value right now:

integration tests against a test DB

Suggested stack:

Vitest or Jest

Supertest for Express API testing

test PostgreSQL DB or isolated Prisma test database

Priority examples:

POST /auth/register

POST /auth/login

POST /auth/refresh

GET /users/me

POST /jokes

GET /jokes?language=NO

GET /jokes?language=EN

comment/like/featured/hall-of-fame endpoints with language scope

Frontend tests

Use for:

rendering logic

state transitions

language-based UI output

page/component behavior with mocked API responses

Suggested stack:

Vitest

React Testing Library

MSW for mocking API

Priority examples:

language switch updates visible text

preferredLanguage from user overrides localStorage after login

protected pages redirect/render correctly

forms show loading/error/success states

navbar/sidebar adapts to auth state and screen logic where testable

E2E tests

Use for:

full real-user flows

catching integration issues no unit test sees

Suggested stack:

Playwright

Why Playwright:

strong for auth flows

multi-browser capable

good for capstone/demo credibility

handles storage/session testing well

Priority scenarios:

login persistence across refresh

language separation workflow

draft-to-publish workflow

admin authorization workflow

5. Recommended manual test checklist

Here is a practical checklist structure.

A. Smoke tests

 Frontend starts without crash

 Backend starts without crash

 DB connected

 Home page loads

 Register works

 Login works

 getMe returns expected logged-in user

 Refresh/reload keeps session valid

 Logout works

 Language switch works globally in UI

B. Auth/session tests

 Invalid login shows proper error

 Protected routes block guests

 Expired token refreshes correctly

 Invalid refresh token logs user out or fails safely

 User remains logged in after refresh

 User state hydrates correctly on app load

C. Language tests

 UI text changes correctly between NO and EN

 No obvious untranslated hardcoded strings in key pages

 Logged-out language uses localStorage/default correctly

 Logged-in language respects preferredLanguage correctly

 Changing preferredLanguage persists correctly

 Shared profile data stays same across languages

 dailyJokeStreak remains shared across languages

D. Joke CRUD

 Create NO joke

 Create EN joke

 Edit joke

 Delete joke

 Joke validation works

 Wrong-language joke does not appear in opposite-language pages

E. Draft workflow

 Save draft in NO

 Save draft in EN

 Edit draft

 Publish draft

 Published draft appears in correct language only

 Delete draft

F. Comments and likes

 Add comment on joke

 Comment appears correctly

 Comment language scoping behaves correctly

 Like joke

 Unlike joke

 Like counts update correctly

 No cross-language leakage through comment/like queries

G. Browse/discovery pages

 All jokes page filters correctly by language

 Popular page filters correctly by language

 Random joke respects language

 Daily joke respects language rules

 Search returns only current-language results

 Featured pages filter correctly

 Hall of Fame filters correctly

H. Profile/user

 Profile loads correctly

 Profile update works

 preferredLanguage update works

 currentBadges loads correctly

 Avatar/profile info renders correctly

I. Admin/security

 Non-admin cannot access admin page

 Admin can access admin page

 Admin actions enforce permissions server-side

 Direct API calls as non-admin are rejected

 Unauthorized edits/deletes are rejected

J. UX and UI states

 Loading states visible where expected

 Empty states look correct

 Error states show useful messages

 Modals open/close correctly

 Mobile nav works

 Desktop nav works

 Sidebar interactions work

 Page refresh on protected page behaves correctly

 No layout breakage on small screens

6. Recommended automation roadmap

Do this in phases.

Phase 1 — Immediate

Set up:

backend test runner

frontend test runner

one E2E runner

Write only a few critical tests first.

Backend first tests

register

login

getMe

refresh

protected route auth

create joke in NO

verify NO list contains it

verify EN list does not

Frontend first tests

LanguageContext picks correct language

logged-in preferredLanguage wins over localStorage

login page renders translated strings

protected route behavior

E2E first tests

login persists after reload

create NO joke and verify EN isolation

draft publish flow

Phase 2 — Expand critical coverage

Add:

comments

likes

profile update

admin authorization

search results by language

popular/random/daily flows

Phase 3 — Stabilize regression suite

Create a smaller “must-pass before deploy” suite:

smoke E2E

auth API tests

language isolation API tests

core frontend render tests

This becomes your regression suite for every major change.

7. Documentation to create

Create these files:

TESTING.md

Purpose:
Explain strategy and how to run tests.

Suggested sections:

testing goals

test layers

tools used

how to run backend tests

how to run frontend tests

how to run E2E tests

test data/setup notes

known risks

pre-release regression process

BUG_LOG.md

Purpose:
Track discovered issues professionally.

Format:

## Bug: EN jokes visible in NO popular page
- Date:
- Environment:
- Severity: High
- Steps to reproduce:
- Expected:
- Actual:
- Suspected cause:
- Status: Open / Fixed / Verified
- Regression test added: Yes / No

This is excellent for interviews because it shows process maturity.

REGRESSION_CHECKLIST.md

Purpose:
A short must-run checklist before demo/deploy.

Example sections:

auth/session

language isolation

joke CRUD

profile

admin access

mobile nav

critical pages render

Keep this short and repeatable.

TEST_CASES.md or MANUAL_QA_CHECKLIST.md

Purpose:
More complete manual QA checklist.

Use the checklist structure above.

8. Good capstone framing for interviews

What interviewers will like is not “I had 95% coverage.”

They will care more that:

you identified high-risk areas after a major architecture change

you separated manual, integration, and E2E concerns

you prioritized auth and language isolation

you used bug logging and regression testing

you automated the flows most likely to break in production

That is strong engineering thinking.

9. Important implementation advice

A few practical rules:

Rule 1

Test current reality, not intended behavior.

If something is unclear, document the expected behavior first, then test it.

Rule 2

Every bug fix in a critical area should add a regression test.

Especially for:

auth

language isolation

permissions

draft/publish

rankings/derived lists

Rule 3

Do not start with lots of unit tests for tiny helpers.

Your biggest risk is not helper functions. It is:

broken API contracts

broken auth flow

broken language scoping

broken user workflows

Rule 4

Use seed data intentionally.

For language testing, create very obvious fixtures:

one NO-only joke

one EN-only joke

one shared user

maybe one admin user

comments/likes attached to each

That makes leakage bugs easy to spot.

10. What I would do next, in order

Run a manual smoke test and note blockers.

Create BUG_LOG.md.

Create MANUAL_QA_CHECKLIST.md.

Verify language isolation manually across core content routes.

Set up backend integration tests for auth + language-filtered joke endpoints.

Add Playwright and automate 2–3 critical flows.

Fix bugs as found, and add regression tests for each serious one.

11. Suggested first-week testing plan
Day 1

smoke test whole app

log bugs

confirm auth/session baseline

Day 2

test NO/EN isolation across jokes, drafts, comments, search

fix biggest data leakage bugs

Day 3

test profile/preferredLanguage/shared user behavior

test popular/random/daily/featured/hall of fame

Day 4

test admin authorization and unauthorized API access

test mobile/desktop nav and UX states

Day 5

set up backend integration tests and first E2E tests

create regression checklist

12. My recommendation on starting point

Start with this exact order:

First manual pass

boot

register

login

getMe

reload/refresh token

logout

language switch

create one NO joke and one EN joke

verify separation in all major listing pages