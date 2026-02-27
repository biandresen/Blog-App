import { useCallback, useMemo, useState } from "react";
import Spinner from "../../../components/atoms/Spinner";
import Button from "../../../components/atoms/Button";
import Post from "../../../components/organisms/Post";
import PostCard from "../../../components/molecules/PostCard";
import { Link } from "react-router-dom";
import { usePagination } from "../../../hooks/usePagination";
import { getAllUserPosts } from "../../../lib/axios";
import type { PostType } from "../../../types/post.types";
import { useUser } from "../../../contexts/UserContext";

const LIMIT = 15;

const MyJokes = () => {
  const { user } = useUser();
  const [showMiniPosts, setShowMiniPosts] = useState(true);

  const userId = user?.id ? Number(user.id) : null;

  const noopSetAccessToken = useCallback(() => {}, []);

  const args = useMemo(() => (userId ? [userId] : []), [userId]);
  const resetKey = useMemo(() => `my-jokes:${userId ?? "anon"}`, [userId]);

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
  } = usePagination<PostType>(getAllUserPosts, {
    accessToken: null,
    setAccessToken: noopSetAccessToken, // ✅ not inline anymore
    limit: LIMIT,
    args,
    resetKey,
    mode: "infinite",
    autoLoadMore: true,
    rootMargin: "700px",
    enabled: !!userId,
  });

  if (!userId) {
    return (
      <div className="text-center posts-section-heading text-[var(--text1)]">
        Login to view your jokes
      </div>
    );
  }

  if (loading && posts.length === 0) return <Spinner />;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">MY JOKES</h2>

      {posts.length > 0 && (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setShowMiniPosts((p) => !p)}
            type="button"
            size="md"
            variant="primary"
            label="toggle joke presentation"
          >
            {showMiniPosts ? "Show full jokes" : "Show joke titles"}
          </Button>

          <Button onClick={reload} type="button" size="md" variant="secondary" label="reload">
            Reload
          </Button>
        </div>
      )}

      {error && <div className="mt-4 text-center text-red-500">{error}</div>}

      <section className="posts-section flex-col">
        {posts.length === 0 && !loading && !error && (
          <div className="text-center posts-section-heading text-[var(--text1)]">
            <p className="text-sm md:text-lg">You haven't created any jokes yet.</p>
            <Button label="Create joke" className="text-sm mt-3">
              <Link to="/dashboard">Create Joke</Link>
            </Button>
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
              <PostCard key={post.id} id={post.id} title={post.title} likes={post.likes.length} />
            ))}

        <div ref={sentinelRef} className="h-8" />

        {canNext && (
          <div className="mt-6 flex justify-center">
            <Button onClick={loadMore} type="button" size="md" variant="secondary" disabled={loading} label="load more">
              {loading ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}

        {meta && (
          <div className="text-center text-sm opacity-70 text-[var(--text1)]">
            Showing {posts.length} of {meta.total}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyJokes;
