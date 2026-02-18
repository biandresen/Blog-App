import { useMemo, useState } from "react";
import Post from "../../../components/organisms/Post";
import Spinner from "../../../components/atoms/Spinner";
import PostCard from "../../../components/molecules/PostCard";
import Button from "../../../components/atoms/Button";
import { usePagination } from "../../../hooks/usePagination";
import { useAuth } from "../../../contexts/AuthContext";
import { getAllPosts } from "../../../lib/axios";
import type { PostType } from "../../../types/post.types";

const LIMIT = 2;

const AllJokes = () => {
  const { accessToken, setAccessToken } = useAuth();

  const [showMiniPosts, setShowMiniPosts] = useState(true);
  const handleTogglePresentation = () => setShowMiniPosts((prev) => !prev);

  const resetKey = useMemo(() => "all-jokes", []);

  const {
    items: posts,
    meta,
    loading,
    error,
    canNext,
    next: loadMore,
    sentinelRef,
    reload,
    replaceItem,
    removeItem,
  } = usePagination<PostType>(getAllPosts, {
    accessToken,          // can be null; wrapper ignores it
    setAccessToken,       // required by hook because safeRequest may refresh elsewhere
    limit: LIMIT,
    mode: "infinite",
    autoLoadMore: true,
    rootMargin: "700px",
    resetKey,
  });

  if (loading && posts.length === 0) return <Spinner />;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">ALL JOKES</h2>

      <div className="flex gap-3 justify-center">
        <Button onClick={handleTogglePresentation} type="button" size="md" variant="primary" label="toggle joke presentation">
          {showMiniPosts ? "Show joke titles" : "Show full jokes"}
        </Button>

        <Button onClick={reload} type="button" size="md" variant="secondary" label="reload posts">
          Reload
        </Button>
      </div>

      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <section className="posts-section">
        {!posts.length && !error && (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">No jokes found</h3>
          </div>
        )}

        {showMiniPosts
          ? posts.map((post) => <Post key={post.id} post={post} onPostUpdated={(updated) => {
                  if (!updated.published) {
                    removeItem(updated.id);     // unpublished => remove from published list
                  } else {
                    replaceItem(updated.id, updated);
                  }}}
                onPostDeleted={(id) => removeItem(id)} />)
          : posts.map((post) => (
              <PostCard key={post.id} id={post.id} title={post.title} likes={post.likes.length}  />
            ))}

        <div ref={sentinelRef} className="h-8" />

        {canNext && (
          <div className="mt-6 flex justify-center">
            <Button onClick={loadMore} type="button" size="md" variant="secondary" label="load more jokes" disabled={loading}>
              {loading ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}

        {meta && (
          <div className="mt-4 text-center text-sm opacity-70 text-[var(--text1)]">
            Showing {posts.length} of {meta.total}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllJokes;
