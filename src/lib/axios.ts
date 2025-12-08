import axios from "axios";
import BLOG_API from "../api/blog-api";
import type { token } from "../types/context.types";

type RegisterUser = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
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
    const res = await axios.post(BLOG_API.BASE + BLOG_API.NEWPASSWORD, {
      token,
      password,
    });
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

export const registerUser = async ({ username, email, password, passwordConfirmation }: RegisterUser) => {
  try {
    const res = await axios.post(BLOG_API.BASE + BLOG_API.REGISTER, {
      username,
      email,
      password,
      passwordConfirmation,
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

export const getCurrentUserDrafts = async (accessToken: token, page: number, limit: number) => {
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

export const getAllPosts = async (page: number, limit: number) => {
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

export const getAllUserPosts = async (authorId: number, page: number, limit: number) => {
  try {
    const res = await axios.get(
      BLOG_API.BASE +
        BLOG_API.USER +
        `/${authorId}` +
        BLOG_API.POSTS +
        `?page=${page}&limit=${limit}&sort=asc`
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
    console.log(res.data);
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
