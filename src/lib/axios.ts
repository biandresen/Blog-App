import axios from "axios";
import BLOG_API from "../api/blog-api";
import type { token } from "../types/context.types";
import type { PaginatedResponse } from "../types/pagination.types";
import type { PostType } from "../types/post.types";

type RegisterUser = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  acceptedTerms: boolean;
};

type LoginUser = {
  userInput: string;
  password: string;
};

export const resetPassword = async ({ email }: { email: string }) => {
  try {
    const res = await axios.post(BLOG_API.BASE + BLOG_API.RESETPASSWORD, {
      email,
    });
    return res.data; // success case
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data.errors);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

export const newPassword = async (token: token | undefined, password: string) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.NEWPASSWORD,
      {
        token,
        password,
      },
      {
        headers: {
          "x-frontend-url": window.location.origin,
        },
      }
    );
    return res.data; // success case
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

export const registerUser = async ({ username, email, password, passwordConfirmation, acceptedTerms }: RegisterUser) => {
  try {
    const res = await axios.post(BLOG_API.BASE + BLOG_API.REGISTER, {
      username,
      email,
      password,
      passwordConfirmation,
      acceptedTerms,
    });
    return res.data; // success case
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data.errors);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

export const loginUser = async ({ userInput, password }: LoginUser) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.LOGIN,
      { userInput, password },
      { withCredentials: true } // required for receiving cookie
    );

    return res.data; // success case
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.LOGOUT,
      {},
      { withCredentials: true } // required for receiving cookie
    );

    return res.data; // success case
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

// export const getCurrentUserDrafts = async (accessToken: token, page: number, limit: number) => {
//   try {
//     const res = await axios.get(
//       BLOG_API.BASE + BLOG_API.GCU_DRAFTS + `?page=${page}&limit=${limit}&sort=asc`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (err: any) {
//     throw err;
//   }
// };

export const getCurrentUserDrafts = async (
  accessToken: token,
  page = 1,
  limit = 15
): Promise<PaginatedResponse<PostType>> => {
  try {
    const res = await axios.get(
      BLOG_API.BASE + BLOG_API.GCU_DRAFTS + `?page=${page}&limit=${limit}&sort=asc`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};


export const deleteUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.delete(BLOG_API.BASE + BLOG_API.USER + `/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const updateUser = async (
  accessToken: string | null,
  id: number | string,
  updates: Record<string, any>
) => {
  if (!accessToken) throw new Error("No access token provided");

  const formData = new FormData();

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  try {
    const res = await axios.patch(`${BLOG_API.BASE}${BLOG_API.USER}/${id}`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getUserByNameOrEmail = async (accessToken: token, userInput: string) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.USERINPUT + `/${userInput}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getUserById = async (accessToken: token, id: number) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.USER + `/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getMe = async (accessToken: token) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.USER + `/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};


export const reactivateUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.patch(
      BLOG_API.BASE + BLOG_API.USER + `/${id}/reactivate`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const deactivateUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.delete(BLOG_API.BASE + BLOG_API.USER + `/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const saveDraft = async (accessToken: token, title: string, body: string, tags: string[]) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS,
      { title, body, published: false, tags },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const publishPost = async (accessToken: token, title: string, body: string, tags: string[]) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS,
      { title, body, published: true, tags },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

// export const getAllPosts = async (page: number, limit: number) => {
//   try {
//     const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + `?page=${page}&limit=${limit}&sort=desc`);
//     return res.data;
//   } catch (err: any) {
//     if (err.response) {
//       // Server responded with 400+
//       return Promise.reject(err.response.data);
//     } else {
//       // Network or unknown error
//       return Promise.reject({ message: err.message || "Something went wrong" });
//     }
//   }
// };

export const getAllPosts = async (
  _accessToken: token, // unused (public endpoint)
  page = 1,
  limit = 15
): Promise<PaginatedResponse<PostType>> => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + `?page=${page}&limit=${limit}&sort=desc`);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

export const addComment = async (accessToken: token, authorId: number, comment: string) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS + `/${authorId}` + BLOG_API.COMMENTS,
      { comment },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const editComment = async (accessToken: token, commentId: number, comment: string) => {
  try {
    const res = await axios.patch(
      BLOG_API.BASE + BLOG_API.COMMENTS + `/${commentId}`,
      { comment },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const deleteComment = async (accessToken: token, commentId: number) => {
  try {
    const res = await axios.delete(BLOG_API.BASE + BLOG_API.COMMENTS + `/${commentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const editPost = async (
  accessToken: token,
  postId: number,
  title: string,
  body: string,
  published: boolean,
  tags: string[]
) => {
  try {
    const res = await axios.patch(
      BLOG_API.BASE + BLOG_API.POSTS + `/${postId}`,
      { title, body, published, tags },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const deletePost = async (accessToken: token, postId: number) => {
  try {
    const res = await axios.delete(BLOG_API.BASE + BLOG_API.POSTS + `/${postId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

// export const getAllUserPosts = async (authorId: number, page: number, limit: number) => {
//   try {
//     const res = await axios.get(
//       BLOG_API.BASE +
//         BLOG_API.USER +
//         `/${authorId}` +
//         BLOG_API.POSTS +
//         `?page=${page}&limit=${limit}&sort=asc`
//     );
//     return res.data;
//   } catch (err: any) {
//     if (err.response) {
//       // Server responded with 400+
//       return Promise.reject(err.response.data);
//     } else {
//       // Network or unknown error
//       return Promise.reject({ message: err.message || "Something went wrong" });
//     }
//   }
// };


// If this endpoint is public, ignore accessToken.
// If it’s protected, include it in headers like your other calls.
export const getAllUserPosts = async (
  _accessToken: token, // unused if public
  page = 1,
  limit = 15,
  userId?: number
): Promise<PaginatedResponse<PostType>> => {
  if (!userId) {
    return Promise.reject({ message: "Missing userId" });
  }

  const res = await axios.get(
    `${BLOG_API.BASE}${BLOG_API.USER}/${userId}/posts?page=${page}&limit=${limit}&sort=desc`
  );

  return res.data;
};


export const getPost = async (accessToken: token, postId: number) => {
  try {
    const res = await axios.get(`${BLOG_API.BASE}${BLOG_API.POSTS}/${postId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const refreshToken = async (postId: number) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + `/${postId}`);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

export const toggleLike = async (accessToken: token, postId: number) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS + `/${postId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

export const getPopularPosts = async () => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + BLOG_API.POPULAR);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

export const getRandomPost = async () => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + BLOG_API.RANDOM);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

export const getDailyPost = async () => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + BLOG_API.DAILY);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

  // must send Authorization header (use your safeRequest wrapper)
export const recordDailyJokeView = async (accessToken: token) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS + BLOG_API.DAILY_VIEW,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

// export const getMyBadgeHistory = async (accessToken: token, page = 1, limit = 50) => {
//   const res = await axios.get(BLOG_API.BASE + BLOG_API.BADGE_HISTORY_ME, {
//     params: { page, limit },
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
//   return res.data;
// };

export const getMyBadgeHistory = async (accessToken: token, page = 1, limit = 15) => {
  try {
    const res = await axios.get(`${BLOG_API.BASE}${BLOG_API.BADGE_HISTORY_ME}?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getMyCurrentBadges = async (accessToken: token) => {
  try {
    const res = await axios.get(
      BLOG_API.BASE + BLOG_API.CURRENT_BADGES_ME,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return res.data;
  } catch (err: any) {
    throw err;
  }
};
