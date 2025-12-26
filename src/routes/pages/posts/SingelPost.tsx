import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/atoms/Spinner";
import Post from "../../../components/organisms/Post";
import { toast } from "react-toastify";
import { usePostsStore } from "../../../stores/posts/PostsProvider";
import { selectPost } from "../../../stores/posts/posts.selectors";
import { useUser } from "../../../contexts/UserContext";

const SinglePost = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const navigate = useNavigate();

  const store = usePostsStore();
  const { user } = useUser();

  const post = useMemo(() => (Number.isFinite(postId) ? selectPost(store, postId) : undefined), [store.byId, postId]);

  useEffect(() => {
  if (!Number.isFinite(postId)) return;

  const s = store.status.single[postId];
  if (s?.loaded || s?.loading) return;

  store.ensurePost(postId);
}, [store.ensurePost, postId, store.status.single]);

  const status = store.status.single[postId];

  if (status?.loading) return <Spinner />;
  if (status?.error) {
    toast.error(status.error);
    return <h3 className="text-center text-[var(--error)]">Failed to load post</h3>;
  }

  if (!post) return <h3 className="text-center text-[var(--text1)]">Post not found</h3>;

  const isAuthor = post.authorId?.toString() === user?.id?.toString();
  const isDraft = post.published === false;

  if (isDraft && !isAuthor) return <h3 className="text-center text-[var(--text1)]">This draft is private</h3>;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">POST DETAILS</h2>
      <section className="posts-section">
        <Post
          post={post}
          onPostDeleted={() => navigate("/posts")}
        />
      </section>
    </div>
  );
};

export default SinglePost;
