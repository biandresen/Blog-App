import axios from "axios";
import type { token } from "../types/context.types";
import BLOG_API from "../api/blog-api";
import { normalizeApiError } from "./normalizeApiError";

export type ModerationCategory =
  | "profanity"
  | "insult"
  | "sexual"
  | "slur"
  | "other";

export type ModerationTerm = {
  id: number;
  term: string;
  category: ModerationCategory | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ModerationCacheMeta = {
  count: number;
  lastLoadedAt: string | null;
  termsLoaded: boolean;
};

export const getModerationTerms = async (
  accessToken: token
) => {
  try {
    const res = await axios.get(`${BLOG_API.BASE}/moderation`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getModerationCacheMeta = async (
  accessToken: token
) => {
  try {
    const res = await axios.get(`${BLOG_API.BASE}/moderation/cache`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const createModerationTerm = async (
  accessToken: token,
  payload: {
    term: string;
    category?: ModerationCategory | "";
    isActive?: boolean;
  }
) => {
  try {
    const res = await axios.post(`${BLOG_API.BASE}/moderation`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const updateModerationTerm = async (
  accessToken: token,
  id: number,
  payload: {
    term?: string;
    category?: ModerationCategory | "";
    isActive?: boolean;
  }
) => {
  try {
    const res = await axios.patch(`${BLOG_API.BASE}/moderation/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const deleteModerationTerm = async (
  accessToken: token,
  id: number
) => {
  try {
    const res = await axios.delete(`${BLOG_API.BASE}/moderation/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const reloadModerationCache = async (
  accessToken: token
) => {
  try {
    const res = await axios.post(
      `${BLOG_API.BASE}/moderation/reload`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};

export const getPublicModerationTerms = async (): Promise<string[]> => {
  try {
    const res = await axios.get(`${BLOG_API.BASE}/moderation/public-terms`, {
      withCredentials: true,
    });

    return res.data?.data ?? [];
  } catch (err: any) {
    throw normalizeApiError(err);
  }
};