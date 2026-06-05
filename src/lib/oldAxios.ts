import axios from "axios";
import JOKE_API from "../api/joke-api";
import type { token } from "../types/context.types";
import type { PaginatedResponse } from "../types/pagination.types";
import type { CommentType, JokeType } from "../types/joke.types";
import type { HallOfFameRow } from "../types/leaderboard.types";
import type { AppLanguage } from "../i18n/translations";
import { languageHeaders } from "../lib/utils";

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
    const res = await axios.post(JOKE_API.BASE + JOKE_API.RESETPASSWORD, {
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
      JOKE_API.BASE + JOKE_API.NEWPASSWORD,
      {
        token,
        password,
      },
      {
        headers: {
          "x-frontend-url": window.location.origin,
        },
      },
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

export const registerUser = async ({
  username,
  email,
  password,
  passwordConfirmation,
  acceptedTerms,
}: RegisterUser) => {
  try {
    const res = await axios.post(JOKE_API.BASE + JOKE_API.REGISTER, {
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

export const loginUser = async ({ userInput, password }: LoginUser, language?: AppLanguage) => {
  try {
    const res = await axios.post(
      JOKE_API.BASE + JOKE_API.LOGIN,
      { userInput, password },
      {
        withCredentials: true,
        headers: {
          ...languageHeaders(language),
        },
      },
    );

    return res.data;
  } catch (err: any) {
    if (err.response) {
      return Promise.reject(err.response.data);
    }
    return Promise.reject({ message: err.message || "Something went wrong" });
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      JOKE_API.BASE + JOKE_API.LOGOUT,
      {},
      { withCredentials: true }, // required for receiving cookie
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

export const deleteUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.delete(JOKE_API.BASE + JOKE_API.USER + `/${id}`, {
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
  updates: Record<string, any>,
) => {
  if (!accessToken) throw new Error("No access token provided");

  const formData = new FormData();

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  try {
    const res = await axios.patch(`${JOKE_API.BASE}${JOKE_API.USER}/${id}`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getUserByNameOrEmail = async (accessToken: token, userInput: string) => {
  try {
    const res = await axios.get(JOKE_API.BASE + JOKE_API.USERINPUT + `/${userInput}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getMe = async (accessToken: token, language?: AppLanguage) => {
  try {
    const res = await axios.get(JOKE_API.BASE + JOKE_API.USER + `/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...languageHeaders(language),
      },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getUserById = async (accessToken: token, id: number) => {
  try {
    const res = await axios.get(JOKE_API.BASE + JOKE_API.USER + `/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const reactivateUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.patch(
      JOKE_API.BASE + JOKE_API.USER + `/${id}/reactivate`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const deactivateUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.delete(JOKE_API.BASE + JOKE_API.USER + `/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getCurrentUserDrafts = async (
  accessToken: token,
  page = 1,
  limit = 15,
  language?: AppLanguage,
): Promise<PaginatedResponse<JokeType>> => {
  try {
    const res = await axios.get(
      JOKE_API.BASE + JOKE_API.GCU_DRAFTS + `?page=${page}&limit=${limit}&sort=asc`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      },
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getAllJokes = async (
  _accessToken: token,
  page = 1,
  limit = 15,
  language?: AppLanguage,
): Promise<PaginatedResponse<JokeType>> => {
  try {
    const res = await axios.get(JOKE_API.BASE + JOKE_API.JOKES + `?page=${page}&limit=${limit}&sort=desc`, {
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    if (err.response) return Promise.reject(err.response.data);
    return Promise.reject({ message: err.message || "Something went wrong" });
  }
};

export const getJoke = async (jokeId: number, language?: AppLanguage) => {
  try {
    const res = await axios.get(`${JOKE_API.BASE}${JOKE_API.JOKES}/${jokeId}`, {
      headers: { ...languageHeaders(language) },
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getPopularJokes = async (language?: AppLanguage) => {
  try {
    const res = await axios.get(JOKE_API.BASE + JOKE_API.JOKES + JOKE_API.POPULAR, {
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    if (err.response) return Promise.reject(err.response.data);
    return Promise.reject({ message: err.message || "Something went wrong" });
  }
};

export const getRandomJoke = async (language?: AppLanguage) => {
  try {
    const res = await axios.get(JOKE_API.BASE + JOKE_API.JOKES + JOKE_API.RANDOM, {
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    if (err.response) return Promise.reject(err.response.data);
    return Promise.reject({ message: err.message || "Something went wrong" });
  }
};

export const getDailyJoke = async (language?: AppLanguage) => {
  try {
    const res = await axios.get(JOKE_API.BASE + JOKE_API.JOKES + JOKE_API.DAILY, {
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    if (err.response) return Promise.reject(err.response.data);
    return Promise.reject({ message: err.message || "Something went wrong" });
  }
};

export const saveDraft = async (
  accessToken: token,
  title: string,
  body: string,
  tags: string[],
  language?: AppLanguage,
) => {
  try {
    const res = await axios.post(
      JOKE_API.BASE + JOKE_API.JOKES,
      { title, body, published: false, tags },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      },
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const publishJoke = async (
  accessToken: token,
  title: string,
  body: string,
  tags: string[],
  language?: AppLanguage,
) => {
  try {
    const res = await axios.post(
      JOKE_API.BASE + JOKE_API.JOKES,
      { title, body, published: true, tags },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      },
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const editJoke = async (
  accessToken: token,
  jokeId: number,
  title: string,
  body: string,
  published: boolean,
  tags: string[],
  language?: AppLanguage,
) => {
  try {
    const res = await axios.patch(
      JOKE_API.BASE + JOKE_API.JOKES + `/${jokeId}`,
      { title, body, published, tags },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      },
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const deleteJoke = async (accessToken: token, jokeId: number, language?: AppLanguage) => {
  try {
    const res = await axios.delete(JOKE_API.BASE + JOKE_API.JOKES + `/${jokeId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...languageHeaders(language),
      },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const toggleLike = async (accessToken: token, jokeId: number, language?: AppLanguage) => {
  try {
    const res = await axios.post(
      JOKE_API.BASE + JOKE_API.JOKES + `/${jokeId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
        withCredentials: true,
      },
    );
    return res.data;
  } catch (err: any) {
    if (err.response) return Promise.reject(err.response.data);
    return Promise.reject({ message: err.message || "Something went wrong" });
  }
};

export const getJokeComments = async (
  _accessToken: token,
  page = 1,
  limit = 10,
  jokeId?: number,
  sort: "asc" | "desc" = "desc",
  language?: AppLanguage,
): Promise<PaginatedResponse<CommentType>> => {
  if (!jokeId) return Promise.reject({ message: "Missing jokeId for comments request" });

  try {
    const res = await axios.get(`${JOKE_API.BASE}${JOKE_API.COMMENTS}/${jokeId}`, {
      params: { page, limit, sort },
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    if (err.response) return Promise.reject(err.response.data);
    return Promise.reject({ message: err.message || "Something went wrong" });
  }
};

export const addComment = async (
  accessToken: token,
  jokeId: number,
  comment: string,
  language?: AppLanguage,
) => {
  try {
    const res = await axios.post(
      JOKE_API.BASE + JOKE_API.JOKES + `/${jokeId}` + JOKE_API.COMMENTS,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      },
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const editComment = async (
  accessToken: token,
  commentId: number,
  comment: string,
  language?: AppLanguage,
) => {
  try {
    const res = await axios.patch(
      JOKE_API.BASE + JOKE_API.COMMENTS + `/${commentId}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      },
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const deleteComment = async (accessToken: token, commentId: number, language?: AppLanguage) => {
  try {
    const res = await axios.delete(JOKE_API.BASE + JOKE_API.COMMENTS + `/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...languageHeaders(language),
      },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

// If this endpoint is public, ignore accessToken.
// If it’s protected, include it in headers like your other calls.
export const getAllUserJokes = async (
  _accessToken: token,
  page = 1,
  limit = 15,
  userId?: number,
  language?: AppLanguage,
): Promise<PaginatedResponse<JokeType>> => {
  if (!userId) {
    return Promise.reject({ message: "Missing userId" });
  }

  const res = await axios.get(
    `${JOKE_API.BASE}${JOKE_API.USER}/${userId}/jokes?page=${page}&limit=${limit}&sort=desc`,
    {
      headers: {
        ...languageHeaders(language),
      },
    },
  );

  return res.data;
};

export const refreshToken = async (jokeId: number) => {
  try {
    const res = await axios.get(JOKE_API.BASE + JOKE_API.JOKES + `/${jokeId}`);
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
      JOKE_API.BASE + JOKE_API.JOKES + JOKE_API.DAILY_VIEW,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      },
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

export const getMyBadgeHistory = async (accessToken: token, page = 1, limit = 15, language?: AppLanguage) => {
  try {
    const res = await axios.get(`${JOKE_API.BASE}${JOKE_API.BADGE_HISTORY_ME}?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...languageHeaders(language),
      },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getMyCurrentBadges = async (accessToken: token, language?: AppLanguage) => {
  try {
    const res = await axios.get(JOKE_API.BASE + JOKE_API.CURRENT_BADGES_ME, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...languageHeaders(language),
      },
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export type FeaturedPayload = {
  type: string;
  date: string;
  joke: JokeType;
};

export async function getFeaturedJoke(slug: string, language?: AppLanguage) {
  try {
    const res = await axios.get(`${JOKE_API.BASE}/featured/${slug}`, {
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    if (err.response) return Promise.reject(err.response.data);
    return Promise.reject({ message: err.message || "Something went wrong" });
  }
}

export const getHallOfFameUsers = async (
  period: "week" | "month" | "all" = "month",
  limit = 25,
  language?: AppLanguage,
) => {
  const res = await axios.get(`${JOKE_API.BASE}/hall-of-fame/users?period=${period}&limit=${limit}`, {
    headers: { ...languageHeaders(language) },
  });

  return res.data as {
    status: string;
    statusCode: number;
    message: string;
    data: HallOfFameRow[];
  };
};

export type SearchFilters = {
  title: boolean;
  body: boolean;
  comments: boolean;
  tags: boolean;
};

export const searchJokes = async (
  _accessToken: token,
  page = 1,
  limit = 15,
  searchParameters?: string,
  filters?: SearchFilters,
  sort: "asc" | "desc" = "desc",
  language?: AppLanguage,
): Promise<PaginatedResponse<JokeType>> => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  params.set("sort", sort);
  if (searchParameters) params.set("searchParameters", searchParameters);

  if (filters) {
    params.set("inTitle", String(filters.title));
    params.set("inBody", String(filters.body));
    params.set("inComments", String(filters.comments));
    params.set("inTags", String(filters.tags));
  }

  const res = await axios.get(`${JOKE_API.BASE}${JOKE_API.JOKES}${JOKE_API.SEARCH}?${params.toString()}`, {
    headers: { ...languageHeaders(language) },
  });

  return res.data;
};
