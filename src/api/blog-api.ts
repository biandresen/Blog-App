const BLOG_API = {
  BASE: "https://pundad.app/api/v1",
  BASE_AVATAR: "https://pundad.app",
  // BASE: "http://localhost:4000/api/v1",
  // BASE_AVATAR: "http://localhost:4000",
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",
  VERIFY_EMAIL: "/auth/verify-email",
  RESEND_VERIFICATION: "/auth/resend-verification",
  RESETPASSWORD: "/auth/reset-password",
  NEWPASSWORD: "/auth/new-password",
  GCU_DRAFTS: "/posts/drafts", //Get Current User Drafts
  USER: "/user",
  USERINPUT: "/user/input",
  POSTS: "/posts",
  COMMENTS: "/comments",
  PUBLISH: "/publish",
  POPULAR: "/popular",
  RANDOM: "/random",
  DAILY: "/daily",
  DAILY_VIEW: "/daily/view",
  BADGE_HISTORY_ME: "/badges/me/history",
  CURRENT_BADGES_ME:"/badges/me/current",
  SEARCH: "/search"
};

export default BLOG_API;
