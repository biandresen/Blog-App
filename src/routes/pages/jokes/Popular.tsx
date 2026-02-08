import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { type PostType } from "../../../types/post.types";
import PostCard from "../../../components/molecules/PostCard";
import { getPopularPosts } from "../../../lib/axios";
import Post from "../../../components/organisms/Post";
import Button from "../../../components/atoms/Button";

const Popular = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [showMiniPosts, setShowMiniPosts] = useState<boolean>(true);

  const postPresentation = showMiniPosts ? "Show full jokes" : "Show joke titles";

  useEffect(() => {
    const fetchPopularPosts = async () => {
      // Fetch popular posts from the API
      try {
        const res = await getPopularPosts();
        setPosts(res.data);
      } catch (err: any) {
        console.error("Error fetching popular jokes:", err);
        toast.error(err.message || "Failed to load popular jokes");
      }
    };

    fetchPopularPosts();
  }, []);

  const handleTogglePresentation = () => {
    setShowMiniPosts((prev) => !prev);
  };

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">POPULAR JOKES</h2>
      <Button
        className="block mx-auto"
        onClick={handleTogglePresentation}
        type="button"
        size="md"
        variant="primary"
        label="toggle joke presentation"
      >
        {postPresentation}
      </Button>
      <section className="posts-section">
        {!posts.length && (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">No jokes found</h3>
          </div>
        )}
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

export default Popular;
