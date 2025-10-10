import { useEffect, useState } from "react";
import PostCard from "../../../components/molecules/PostCard";
import { getAllUserPosts } from "../../../lib/axios";
import type { PostType } from "../../../types/post.types";
import { useUser } from "../../../contexts/UserContext";

const MyPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const { user } = useUser();

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;

      try {
        const res = await getAllUserPosts(Number(user?.id), 1, 10);
        if (res.statusCode !== 200) {
          throw new Error(res.message);
        }
        setPosts(res.data);
      } catch (err: any) {
        console.error("Failed to fetch user posts:", err.message || err);
      }
    };

    fetchUserPosts();

    return () => {
      setPosts([]); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">MY POSTS</h2>
      <section className="posts-section">
        {posts.length > 0 ?
          posts.map((post) => <PostCard key={post.id} id={post.id} draftTitle={post.title} />)
        : <div>
            <h3 className="posts-section-heading text-[var(--text1)]">No posts found</h3>
          </div>
        }
      </section>
    </div>
  );
};

export default MyPosts;
