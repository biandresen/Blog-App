import { useEffect, useState } from "react";
import { getAllPosts } from "../../../lib/axios";
import { type PostType } from "../../../types/post.types";
import Post from "../../../components/organisms/Post";

const AllPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts(1, 10);
        if (res.statusCode !== 200) {
          setError(res.message);
          throw new Error("Request failed");
        }
        setPosts(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">ALL POSTS</h2>
      <section>
        {posts && posts.length === 0 && <h3 className="posts-section-heading">No posts found</h3>}
        {posts && posts.length !== 0 && posts.map((post) => <Post key={post.id} post={post} />)}
      </section>
    </div>
  );
};

export default AllPosts;
