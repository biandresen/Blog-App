const BLOG_API = {
  // BASE: "https://bloggy-app.dev/api/v1",
  // BASE_AVATAR: "https://bloggy-app.dev",
  BASE: "http://localhost:4000/api/v1",
  BASE_AVATAR: "http://localhost:4000",
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  RESETPASSWORD: "/auth/reset-password",
  NEWPASSWORD: "/auth/new-password",
  GCU_DRAFTS: "/posts/drafts", //Get Current User Drafts
  USER: "/user",
  USERINPUT: "/user/input",
  POSTS: "/posts",
  COMMENTS: "/comments",
  PUBLISH: "/publish",
  POPULAR: "/popular",
};

export default BLOG_API;
