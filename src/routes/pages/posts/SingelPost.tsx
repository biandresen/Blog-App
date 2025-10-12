import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getPost } from "../../../lib/axios";
import Post from "../../../components/organisms/Post";
import { usePosts } from "../../../contexts/PostsContext";
import { type PostType } from "../../../types/post.types";
import Spinner from "../../../components/atoms/Spinner";
import { useUser } from "../../../contexts/UserContext";

const SinglePost = () => {
  const { id: postId } = useParams<{ id: string }>();
  const { posts, updatePost, deletePost } = usePosts();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthor = post?.authorId?.toString() === useUser().user?.id.toString();
  const isDraft = post?.published === false;

  useEffect(() => {
    // First try to find the post in context (instant render)
    const contextPost = posts.find((p) => p.id === Number(postId));

    if (contextPost) {
      setPost(contextPost);
      setLoading(false);
    } else {
      // Fallback: fetch from server if not found in context
      const fetchPost = async () => {
        try {
          const res = await getPost(Number(postId));
          console.log(res);
          if (res.statusCode !== 200) {
            toast.error("No post found");
            throw new Error("No post found");
          }
          setPost(res.data);
        } catch (err: any) {
          toast.error(err.message);
          console.error("Error fetching post:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [posts, postId]);

  const handlePostUpdated = (updatedPost: PostType) => {
    updatePost(updatedPost);
    setPost(updatedPost);
  };

  const handlePostDeleted = (postId: number) => {
    deletePost(postId);
  };

  if (loading) return <Spinner />;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">POST DETAILS</h2>
      <section>
        {!post && <h3 className="posts-section-heading text-[var(--text1)]">Post not found</h3>}
        {post && isDraft && !isAuthor && (
          <h3 className="posts-section-heading text-[var(--text1)]">This draft is private</h3>
        )}
        {post && (!isDraft || isAuthor) && (
          <Post
            key={post.id}
            post={post}
            onPostUpdated={handlePostUpdated}
            onPostDeleted={handlePostDeleted}
          />
        )}
      </section>
    </div>
  );
};

export default SinglePost;
