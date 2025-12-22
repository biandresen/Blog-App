import { createContext, useContext, useCallback, useMemo, useState } from "react";
import { getAllPosts } from "../lib/axios";
import { type PostType } from "../types/post.types";

interface PostsContextType {
  posts: PostType[];
  loading: boolean;
  error: string | null;
  refreshPosts: (page?: number, limit?: number) => Promise<void>;
  addPost: (newPost: PostType) => void;
  clearPosts: () => void;
  hasLoaded: boolean;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false); // start false since we won't auto-fetch
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const refreshPosts = useCallback(async (page = 1, limit = 50) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAllPosts(page, limit);
      if (res.statusCode !== 200) throw new Error(res.message);

      setPosts(res.data);
      setHasLoaded(true);
    } catch (err: any) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, []);

  const addPost = useCallback((newPost: PostType) => {
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const clearPosts = useCallback(() => {
    setPosts([]);
    setError(null);
    setLoading(false);
    setHasLoaded(false);
  }, []);

  const value = useMemo(
    () => ({ posts, loading, error, refreshPosts, addPost, clearPosts, hasLoaded }),
    [posts, loading, error, refreshPosts, addPost, clearPosts, hasLoaded]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePosts must be used within a PostsProvider");
  return context;
};
