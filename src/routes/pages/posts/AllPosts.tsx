import { useEffect, useState } from "react";
import { usePosts } from "../../../contexts/PostsContext";
import Post from "../../../components/organisms/Post";
import Spinner from "../../../components/atoms/Spinner";
import PostCard from "../../../components/molecules/PostCard";
import Button from "../../../components/atoms/Button";

const AllPosts = () => {
  const { posts, loading, error, refreshPosts} = usePosts();
  const [showMiniPosts, setShowMiniPosts] = useState(true);

  useEffect(() => {
    refreshPosts(1, 50);
  }, []);

  const handleTogglePresentation = () => setShowMiniPosts((prev) => !prev);

  // const handleManualRefresh = () => refreshPosts(1, 10);

  if (loading) return <Spinner />;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">ALL POSTS</h2>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={handleTogglePresentation}
          type="button"
          size="md"
          variant="primary"
          label="toggle post presentation"
        >
          {showMiniPosts ? "Show mini posts" : "Show full posts"}
        </Button>

        {/* <Button
          onClick={handleManualRefresh}
          type="button"
          size="md"
          variant="secondary"
          label="refresh posts"
        >
          Refresh
        </Button> */}
      </div>

      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <section className="posts-section">
        {!posts.length && !error && (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">No posts found</h3>
          </div>
        )}

        {showMiniPosts
          ? posts.map((post) => <Post key={post.id} post={post} />)
          : posts.map((post) => (
              <PostCard key={post.id} id={post.id} title={post.title} likes={post.likes.length} />
            ))}
      </section>
    </div>
  );
};

export default AllPosts;
