import { useEffect, useState } from "react";
import PostCard from "../../../components/molecules/PostCard";
import { getAllUserPosts } from "../../../lib/axios";
import type { PostType } from "../../../types/post.types";
import { useUser } from "../../../contexts/UserContext";
import Spinner from "../../../components/atoms/Spinner";

const MyPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!user) {
          setError("Login to view your posts");
          return;
        }
        const res = await getAllUserPosts(Number(user?.id), 1, 10);
        if (res.statusCode !== 200) {
          throw new Error(res.message);
        }
        setLoading(false);
        setError(null);
        setPosts(res.data);
      } catch (err: any) {
        console.error("Failed to fetch user posts:", err.message || err);
        setError(err.message || "An error occurred while fetching posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();

    return () => {
      setPosts([]); // Cleanup on unmount
    };
  }, []);

  if (loading) return <Spinner />;

  if (error) return <div className="text-center posts-section-heading text-[var(--text1)]">{error}</div>;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">MY POSTS</h2>
      <section className="posts-section">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} id={post.id} title={post.title} />)
        ) : (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">No posts found</h3>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyPosts;
