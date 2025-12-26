import { useEffect, useMemo, useState } from "react";
import Spinner from "../../../components/atoms/Spinner";
import Post from "../../../components/organisms/Post";
import PostCard from "../../../components/molecules/PostCard";
import Button from "../../../components/atoms/Button";

import { usePostsStore } from "../../../stores/posts/PostsProvider";
import { selectPublishedPosts } from "../../../stores/posts/posts.selectors";

const AllPosts = () => {
  const store = usePostsStore();
  const posts = useMemo(() => selectPublishedPosts(store), [store.byId, store.lists.published]);

  const [showMiniPosts, setShowMiniPosts] = useState(true);

useEffect(() => {
  if (store.status.published.loaded || store.status.published.loading) return;
  store.ensurePublished(1, 50);
}, [
  store.ensurePublished,
  store.status.published.loaded,
  store.status.published.loading,
]);


  if (store.status.published.loading) return <Spinner />;
  if (store.status.published.error) return <div className="text-[var(--text1)]">{store.status.published.error}</div>;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">ALL POSTS</h2>

      <Button
        className="block mx-auto"
        onClick={() => setShowMiniPosts((p) => !p)}
        type="button"
        size="md"
        variant="primary"
        label="toggle post presentation"
      >
        {showMiniPosts ? "Show mini posts" : "Show full posts"}
      </Button>

      <section className="posts-section">
        {!posts.length && <h3 className="posts-section-heading text-[var(--text1)]">No posts found</h3>}

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
