import { useEffect, useState } from "react";
import PostCard from "../../../components/molecules/PostCard";
import { getAllUserPosts } from "../../../lib/axios";
import type { PostType } from "../../../types/post.types";
import { useUser } from "../../../contexts/UserContext";
import Spinner from "../../../components/atoms/Spinner";
import Button from "../../../components/atoms/Button";
import Post from "../../../components/organisms/Post";
import { Link } from "react-router-dom";

const MyJokes = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showMiniPosts, setShowMiniPosts] = useState<boolean>(true);

  const postPresentation = showMiniPosts ? "Show full jokes" : "Show joke titles";

  const { user } = useUser();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!user) {
          setError("Login to view your jokes");
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
        console.error("Failed to fetch user jokes:", err.message || err);
        setError(err.message || "An error occurred while fetching jokes.");
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

  const handleTogglePresentation = () => {
    setShowMiniPosts((prev) => !prev);
  };

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">MY JOKES</h2>
      {posts.length > 0 && <Button
        className="block mx-auto"
        onClick={handleTogglePresentation}
        type="button"
        size="md"
        variant="primary"
        label="toggle joke presentation"
      >
        {postPresentation}
      </Button>
      }
      <section className="posts-section">
        {posts.length === 0 && <div className="text-center posts-section-heading text-[var(--text1)]">
          <p className="text-sm md:text-lg">You haven't created any jokes yet.</p>
          <Button label="Create joke" className="text-sm mt-3">
            <Link to="/dashboard" className="">Create Joke</Link>
          </Button>
        </div>}

        {showMiniPosts
          ? posts &&
            posts.map((post) => (
              <PostCard
                key={post.id + post.title}
                id={post.id}
                title={post.title}
                likes={post.likes.length}
              />
            ))
          : posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </section>
    </div>
  );
};

export default MyJokes;
