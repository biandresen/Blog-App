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