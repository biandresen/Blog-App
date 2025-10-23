import { usePosts } from "../../../contexts/PostsContext";
import Post from "../../../components/organisms/Post";
import Spinner from "../../../components/atoms/Spinner";
import { useEffect } from "react";

const AllPosts = () => {
  const { posts, loading, error, refreshPosts } = usePosts();

  useEffect(() => {
    refreshPosts(); // Fetch fresh posts whenever this component mounts
  }, []);

  if (loading) return <Spinner />;

  if (error) {
    return <div className="text-[var(--text1)] text-center">No posts found</div>;
  }

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">ALL POSTS</h2>
      <section>
        {posts.length === 0 ? (
          <h3 className="posts-section-heading text-[var(--text1)] text-center">No posts founds</h3>
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </section>
    </div>
  );
};

export default AllPosts;
