import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { usePosts } from "../../../contexts/PostsContext";
import { useUser } from "../../../contexts/UserContext";
import Spinner from "../../../components/atoms/Spinner";
import Post from "../../../components/organisms/Post";
import { getPost } from "../../../lib/axios";
import { useSafeRequest } from "../../../hooks/useSafeRequest";
import { useEffect } from "react";

const SinglePost = () => {
  const { id: postId } = useParams<{ id: string }>();
  const { posts, refreshPosts } = usePosts();
  const { user } = useUser();

    useEffect(() => {
      refreshPosts(1, 50);
    }, []);

  // Try to find post in context for instant display
  const contextPost = posts.find((p) => p.id === Number(postId));

  // Fetch post safely if not found in context
  const { data: fetchedPost, error, loading } = useSafeRequest(getPost, Number(postId));

  // Choose which post to show (context or fetched)
  const post = contextPost ?? fetchedPost?.data;
  const isAuthor = post?.authorId?.toString() === user?.id.toString();
  const isDraft = post?.published === false;

  // Handle errors and loading
  if (loading) return <Spinner />;
  if (error) {
    toast.error(error);
    return <h3 className="text-center text-[var(--error)]">Failed to load post</h3>;
  }

  // Render post
  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">POST DETAILS</h2>
      <section className="posts-section">
        {!post && <h3 className="posts-section-heading text-[var(--text1)]">Post not found</h3>}
        {post && isDraft && !isAuthor && (
          <h3 className="posts-section-heading text-[var(--text1)]">This draft is private</h3>
        )}
        {post && (!isDraft || isAuthor) && <Post key={post.id} post={post} />}
      </section>
    </div>
  );
};

export default SinglePost;
