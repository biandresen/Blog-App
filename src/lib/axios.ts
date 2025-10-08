import axios from "axios";
import BLOG_API from "../api/blog-api";
import type { token } from "../types/context.types";
import type { UserUpdates } from "../types/general.types";

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
    const res = await axios.post(BLOG_API.BASE + BLOG_API.LOGIN, {
      userInput,
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
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};

export const deleteUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.delete(BLOG_API.BASE + BLOG_API.USER + `/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

export const updateUser = async (accessToken: token, id: number | string, ...updates: UserUpdates[]) => {
  try {
    const res = await axios.patch(BLOG_API.BASE + BLOG_API.USER + `/${id}`, ...updates, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

export const getUserByNameOrEmail = async (accessToken: token, userInput: string) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.USERINPUT + `/${userInput}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

export const reactivateUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.patch(
      BLOG_API.BASE + BLOG_API.USER + `/${id}/reactivate`,
      {}, //Empty patch body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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

export const deactivateUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.delete(BLOG_API.BASE + BLOG_API.USER + `/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

export const saveDraft = async (accessToken: token, title: string, body: string, tags: string[]) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS,
      {
        title,
        body,
        published: false,
        tags,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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

export const publishPost = async (accessToken: token, title: string, body: string, tags: string[]) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS,
      {
        title,
        body,
        published: true,
        tags,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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

export const getAllPosts = async (page: number, limit: number) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + `?page=${page}&limit=${limit}&sort=asc`);
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
      {
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
