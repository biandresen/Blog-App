import React, { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { postsReducer, initialPostsState } from "./posts.reducer";
import { type PostsState } from "./posts.types";
import { getAllPosts, getCurrentUserDrafts, getPostPublic, getPostAuthed, editPost, deletePost } from "../../lib/axios";
import { safeRequest } from "../../lib/auth";
import { useAuth } from "../../contexts/AuthContext";

type PostsStore = PostsState & {
  ensurePublished: (page?: number, limit?: number) => Promise<void>;
  refreshPublished: (page?: number, limit?: number) => Promise<void>;
  ensurePost: (postId: number) => Promise<void>;
  ensureDrafts: (userId: number, page?: number, limit?: number) => Promise<void>;

  updatePost: (postId: number, payload: any) => Promise<any>;
  removePost: (postId: number) => Promise<void>;
};

function unwrapPost(res: any) {
  // supports both shapes you’ve had during refactors
  return res?.data?.data ?? res?.data ?? res;
}

const PostsContext = createContext<PostsStore | null>(null);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(postsReducer, initialPostsState);
  const { accessToken, setAccessToken } = useAuth();

const ensurePublished = useCallback(async (page = 1, limit = 50) => {
  dispatch({ type: "SET_STATUS", scope: "published", patch: { loading: true, error: null } });

  try {
    const res = await getAllPosts(page, limit);
    if (res.statusCode !== 200) throw new Error(res.message);

    dispatch({ type: "UPSERT_MANY", posts: res.data });
    dispatch({ type: "SET_PUBLISHED_LIST", ids: res.data.map((p: any) => p.id) });
    dispatch({ type: "SET_STATUS", scope: "published", patch: { loading: false, loaded: true } });
  } catch (e: any) {
    dispatch({ type: "SET_STATUS", scope: "published", patch: { loading: false, error: e.message } });
  }
}, []); // <-- stable


const refreshPublished = useCallback(async (page = 1, limit = 50) => {
  dispatch({ type: "SET_STATUS", scope: "published", patch: { loading: true, error: null } });
  try {
    const res = await getAllPosts(page, limit);
    if (res.statusCode !== 200) throw new Error(res.message);

    dispatch({ type: "UPSERT_MANY", posts: res.data });
    dispatch({ type: "SET_PUBLISHED_LIST", ids: res.data.map((p: any) => p.id) });
    dispatch({ type: "SET_STATUS", scope: "published", patch: { loading: false, loaded: true } });
  } catch (e: any) {
    dispatch({ type: "SET_STATUS", scope: "published", patch: { loading: false, error: e.message } });
  }
}, []);

const ensurePost = useCallback(async (postId: number) => {
  const status = state.status.single[postId];
  if (status?.loading) return;

  dispatch({ type: "SET_STATUS", scope: "single", key: postId, patch: { loading: true, error: null } });

  try {
    const res = accessToken
      ? await safeRequest(getPostAuthed as any, accessToken, setAccessToken, postId)
      : await getPostPublic(postId);

    if (res.statusCode !== 200) throw new Error(res.message);

    const post = unwrapPost(res);
    dispatch({ type: "UPSERT_ONE", post });
    dispatch({ type: "SET_STATUS", scope: "single", key: postId, patch: { loading: false, loaded: true } });
  } catch (e: any) {
    dispatch({ type: "SET_STATUS", scope: "single", key: postId, patch: { loading: false, error: e.message } });
  }
}, [state.status.single, accessToken, setAccessToken]);



const ensureDrafts = useCallback(async (userId: number, page = 1, limit = 10) => {
  const status = state.status.drafts[userId];
  if (status?.loading) return;

  dispatch({ type: "SET_STATUS", scope: "drafts", key: userId, patch: { loading: true, error: null } });

  try {
    if (!accessToken) throw new Error("Not authenticated");

    const res = await safeRequest(getCurrentUserDrafts, accessToken, setAccessToken, page, limit);
    if (res.statusCode !== 200) throw new Error(res.message);

    const posts = unwrapPost(res); // should be an array here
    dispatch({ type: "UPSERT_MANY", posts });
    dispatch({ type: "SET_DRAFTS_LIST", userId, ids: posts.map((p: any) => p.id) });
    dispatch({ type: "SET_STATUS", scope: "drafts", key: userId, patch: { loading: false, loaded: true } });
  } catch (e: any) {
    dispatch({ type: "SET_STATUS", scope: "drafts", key: userId, patch: { loading: false, error: e.message } });
  }
}, [state.status.drafts, accessToken, setAccessToken]);



const updatePost = useCallback(async (postId: number, payload: any) => {
  if (!accessToken) throw new Error("Not authenticated");

  const res = await safeRequest(
    editPost,
    accessToken,
    setAccessToken,
    postId,
    payload.title,
    payload.body,
    payload.published,
    payload.tags
  );

  if (res.statusCode !== 200) throw new Error(res.message);

  // Don’t trust the edit response shape; re-fetch canonical
  await ensurePost(postId);

  // return the latest from store (optional)
  return;
}, [accessToken, setAccessToken, ensurePost]);



const removePost = useCallback(async (postId: number) => {
  if (!accessToken) throw new Error("Not authenticated");

  const res = await safeRequest(deletePost, accessToken, setAccessToken, postId);

  if (res.statusCode !== 200) throw new Error(res.message);

  dispatch({ type: "REMOVE_ONE", postId });
}, [accessToken, setAccessToken]);


  const value = useMemo(
    () => ({
      ...state,
      ensurePublished,
      refreshPublished,
      ensurePost,
      ensureDrafts,
      updatePost,
      removePost,
    }),
    [state, ensurePublished, ensurePost, ensureDrafts, updatePost, removePost]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export function usePostsStore() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePostsStore must be used within PostsProvider");
  return ctx;
}
