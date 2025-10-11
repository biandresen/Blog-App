import { createContext, useContext, useEffect, useState } from "react";
import { getAllPosts } from "../lib/axios";
import { type PostType } from "../types/post.types";

interface PostsContextType {
  posts: PostType[];
  loading: boolean;
  error: string | null;
  refreshPosts: () => Promise<void>;
  addPost: (newPost: PostType) => void;
  updatePost: (updatedPost: PostType) => void;
  deletePost: (postId: number) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getAllPosts(1, 10);
      if (res.statusCode !== 200) throw new Error(res.message);
      setPosts(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = (newPost: PostType) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (updatedPost: PostType) => {
    setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };

  const deletePost = (postId: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <PostsContext.Provider
      value={{ posts, loading, error, refreshPosts: fetchPosts, addPost, updatePost, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePosts must be used within a PostsProvider");
  return context;
};
