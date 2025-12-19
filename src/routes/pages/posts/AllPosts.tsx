import { usePosts } from "../../../contexts/PostsContext";
import Post from "../../../components/organisms/Post";
import Spinner from "../../../components/atoms/Spinner";
import { useEffect, useState } from "react";
import PostCard from "../../../components/molecules/PostCard";
import Button from "../../../components/atoms/Button";

const AllPosts = () => {
  const { posts, loading,refreshPosts } = usePosts();
  const [showMiniPosts, setShowMiniPosts] = useState<boolean>(true);

  useEffect(() => {
    refreshPosts(); // Fetch fresh posts whenever this component mounts
  }, []);


  const handleTogglePresentation = () => {
    setShowMiniPosts((prev) => !prev);
  };

  const postPresentation = showMiniPosts ? "Show mini posts" : "Show full posts";

  if (loading) return <Spinner />;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">ALL POSTS</h2>
      <Button
        className="block mx-auto"
        onClick={handleTogglePresentation}
        type="button"
        size="md"
        variant="primary"
        label="toggle post presentation"
      >
        {postPresentation}
      </Button>
        <section className="posts-section">
        {!posts.length && (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">No posts found</h3>
          </div>
        )}
        {showMiniPosts
          ? posts && posts.map((post) => <Post key={post.id} post={post} />)
          : posts &&
            posts.map((post) => (
              <PostCard
                key={post.id + post.title}
                id={post.id}
                title={post.title}
                likes={post.likes.length}
              />
            ))}
      </section>
    </div>
  );
};

export default AllPosts;
