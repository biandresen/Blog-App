import axios from "axios";
import BLOG_API from "../api/blog-api";
import type { token } from "../types/context.types";
import type { PaginatedResponse } from "../types/pagination.types";
import type { CommentType, PostType } from "../types/post.types";
import type { HallOfFameRow } from "../types/hallOfFame.types";
import type { AppLanguage } from "../i18n/translations";
import { languageHeaders } from "../lib/utils";
import { normalizeApiError } from "./normalizeApiError";

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

export const verifyEmail = async (token: string) => {
  try {
    const res = await axios.get(`${BLOG_API.BASE}${BLOG_API.VERIFY_EMAIL}`, {
      params: { token },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const resendVerificationEmail = async ({ email }: { email: string }) => {
  try {
    const res = await axios.post(`${BLOG_API.BASE}${BLOG_API.RESEND_VERIFICATION}`, {
      email,
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const resetPassword = async ({ email }: { email: string }) => {
  try {
    const res = await axios.post(BLOG_API.BASE + BLOG_API.RESETPASSWORD, {
      email,
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
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
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
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
    const res = await axios.post(BLOG_API.BASE + BLOG_API.REGISTER, {
      username,
      email,
      password,
      passwordConfirmation,
      acceptedTerms,
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const loginUser = async (
  { userInput, password }: LoginUser,
  language?: AppLanguage
) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.LOGIN,
      { userInput, password },
      {
        withCredentials: true,
        headers: {
          ...languageHeaders(language),
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.LOGOUT,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const deleteUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.delete(BLOG_API.BASE + BLOG_API.USER + `/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
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
    throw normalizeApiError(err);
  }
};

export const getUserByNameOrEmail = async (accessToken: token, userInput: string) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.USERINPUT + `/${userInput}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getMe = async (accessToken: token, language?: AppLanguage) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.USER + `/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...languageHeaders(language),
      },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getUserById = async (accessToken: token, id: number) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.USER + `/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
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
    throw normalizeApiError(err);
  }
};

export const deactivateUser = async (accessToken: token, id: number | string) => {
  try {
    const res = await axios.delete(BLOG_API.BASE + BLOG_API.USER + `/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getCurrentUserDrafts = async (
  accessToken: token,
  page = 1,
  limit = 15,
  language?: AppLanguage
): Promise<PaginatedResponse<PostType>> => {
  try {
    const res = await axios.get(
      BLOG_API.BASE + BLOG_API.GCU_DRAFTS + `?page=${page}&limit=${limit}&sort=asc`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getAllPosts = async (
  _accessToken: token,
  page = 1,
  limit = 15,
  language?: AppLanguage
): Promise<PaginatedResponse<PostType>> => {
  try {
    const res = await axios.get(
      BLOG_API.BASE + BLOG_API.POSTS + `?page=${page}&limit=${limit}&sort=desc`,
      { headers: { ...languageHeaders(language) } }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getPost = async (accessToken: token, postId: number, language?: AppLanguage) => {
  try {
    const res = await axios.get(`${BLOG_API.BASE}${BLOG_API.POSTS}/${postId}`, {
      headers: { Authorization: `Bearer ${accessToken}`, ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getPopularPosts = async (language?: AppLanguage) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + BLOG_API.POPULAR, {
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getRandomPost = async (language?: AppLanguage) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + BLOG_API.RANDOM, {
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getDailyPost = async (language?: AppLanguage) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + BLOG_API.DAILY, {
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const saveDraft = async (
  accessToken: token,
  title: string,
  body: string,
  tags: string[],
  language?: AppLanguage
) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS,
      { title, body, published: false, tags },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const publishPost = async (
  accessToken: token,
  title: string,
  body: string,
  tags: string[],
  language?: AppLanguage
) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS,
      { title, body, published: true, tags },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const editPost = async (
  accessToken: token,
  postId: number,
  title: string,
  body: string,
  published: boolean,
  tags: string[],
  language?: AppLanguage
) => {
  try {
    const res = await axios.patch(
      BLOG_API.BASE + BLOG_API.POSTS + `/${postId}`,
      { title, body, published, tags },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const deletePost = async (accessToken: token, postId: number, language?: AppLanguage) => {
  try {
    const res = await axios.delete(BLOG_API.BASE + BLOG_API.POSTS + `/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...languageHeaders(language),
      },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const toggleLike = async (accessToken: token, postId: number, language?: AppLanguage) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS + `/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getPostComments = async (
  _accessToken: token,
  page = 1,
  limit = 10,
  postId?: number,
  sort: "asc" | "desc" = "desc",
  language?: AppLanguage
): Promise<PaginatedResponse<CommentType>> => {
  if (!postId) throw normalizeApiError(new Error("Missing postId for comments request"));

  try {
    const res = await axios.get(`${BLOG_API.BASE}${BLOG_API.COMMENTS}/${postId}`, {
      params: { page, limit, sort },
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const addComment = async (
  accessToken: token,
  authorId: number,
  comment: string,
  language?: AppLanguage
) => {
  try {
    const res = await axios.post(
      BLOG_API.BASE + BLOG_API.POSTS + `/${authorId}` + BLOG_API.COMMENTS,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const editComment = async (
  accessToken: token,
  commentId: number,
  comment: string,
  language?: AppLanguage
) => {
  try {
    const res = await axios.patch(
      BLOG_API.BASE + BLOG_API.COMMENTS + `/${commentId}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const deleteComment = async (
  accessToken: token,
  commentId: number,
  language?: AppLanguage
) => {
  try {
    const res = await axios.delete(BLOG_API.BASE + BLOG_API.COMMENTS + `/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...languageHeaders(language),
      },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getAllUserPosts = async (
  _accessToken: token,
  page = 1,
  limit = 15,
  userId?: number,
  language?: AppLanguage
): Promise<PaginatedResponse<PostType>> => {
  if (!userId) throw normalizeApiError(new Error("Missing userId"));

  try {
    const res = await axios.get(
      `${BLOG_API.BASE}${BLOG_API.USER}/${userId}/posts?page=${page}&limit=${limit}&sort=desc`,
      {
        headers: {
          ...languageHeaders(language),
        },
      }
    );

    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getPostByIdPublic = async (postId: number) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.POSTS + `/${postId}`);
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

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
    throw normalizeApiError(err);
  }
};

export const getMyBadgeHistory = async (
  accessToken: token,
  page = 1,
  limit = 15,
  language?: AppLanguage
) => {
  try {
    const res = await axios.get(
      `${BLOG_API.BASE}${BLOG_API.BADGE_HISTORY_ME}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...languageHeaders(language),
        },
      }
    );
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getMyCurrentBadges = async (accessToken: token, language?: AppLanguage) => {
  try {
    const res = await axios.get(BLOG_API.BASE + BLOG_API.CURRENT_BADGES_ME, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...languageHeaders(language),
      },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export type FeaturedPayload = {
  type: string;
  date: string;
  post: PostType;
};

export async function getFeaturedPost(slug: string, language?: AppLanguage) {
  try {
    const res = await axios.get(`${BLOG_API.BASE}/featured/${slug}`, {
      headers: { ...languageHeaders(language) },
    });
    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
}

export const getHallOfFameUsers = async (
  period: "week" | "month" | "all" = "month",
  limit = 25,
  language?: AppLanguage
) => {
  try {
    const res = await axios.get(
      `${BLOG_API.BASE}/hall-of-fame/users?period=${period}&limit=${limit}`,
      {
        headers: { ...languageHeaders(language) },
      }
    );

    return res.data as {
      status: string;
      statusCode: number;
      message: string;
      data: HallOfFameRow[];
    };
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export type SearchFilters = {
  title: boolean;
  body: boolean;
  comments: boolean;
  tags: boolean;
};

export const searchPosts = async (
  _accessToken: token,
  page = 1,
  limit = 15,
  searchParameters?: string,
  filters?: SearchFilters,
  sort: "asc" | "desc" = "desc",
  language?: AppLanguage
): Promise<PaginatedResponse<PostType>> => {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));
  params.set("sort", sort);

  if (searchParameters) {
    params.set("searchParameters", searchParameters);
  }

  if (filters) {
    params.set("title", String(filters.title));
    params.set("body", String(filters.body));
    params.set("comments", String(filters.comments));
    params.set("tags", String(filters.tags));
  }

  try {
    const res = await axios.get(
      `${BLOG_API.BASE}${BLOG_API.POSTS}${BLOG_API.SEARCH}?${params.toString()}`,
      {
        headers: { ...languageHeaders(language) },
      }
    );

    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};