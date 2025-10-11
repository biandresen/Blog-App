import { usePosts } from "../../../contexts/PostsContext";
import Post from "../../../components/organisms/Post";
import { type PostType } from "../../../types/post.types";
import { ClipLoader } from "react-spinners";
import type { CSSProperties } from "react";

const AllPosts = () => {
  const { posts, loading, error, updatePost, deletePost } = usePosts();

  const handlePostUpdated = (updatedPost: PostType) => {
    updatePost(updatedPost);
  };

  const handlePostDeleted = (postId: number) => {
    deletePost(postId);
  };

  const override: CSSProperties = {
    color: "var(--text1)",
  };

  if (loading) {
    return (
      <div className="spinner-position">
        <ClipLoader
          color={override.color}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-[var(--error)]">No posts found</div>;
  }

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">ALL POSTS</h2>
      <section>
        {posts.length === 0 ?
          <h3 className="posts-section-heading">No posts found</h3>
        : posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onPostUpdated={handlePostUpdated}
              onPostDeleted={handlePostDeleted}
            />
          ))
        }
      </section>
    </div>
  );
};

export default AllPosts;
