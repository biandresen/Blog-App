import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { usePagination } from "../../../hooks/usePagination";
import { getCurrentUserDrafts } from "../../../lib/axios";
import Spinner from "../../../components/atoms/Spinner";
import Button from "../../../components/atoms/Button";
import DraftCard from "../../../components/molecules/DraftCard";
import Post from "../../../components/organisms/Post";
import { Link } from "react-router-dom";
import type { PostType } from "../../../types/post.types";
import draftsContent from "../../../text-content/drafts-page";

const LIMIT = 2;

const Drafts = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [showMiniPosts, setShowMiniPosts] = useState(true);

  if (!accessToken) {
    return <p className="text-center mt-10 text-[var(--text1)]">Please log in to view your drafts.</p>;
  }

  const resetKey = useMemo(() => "my-drafts", []);

  const {
    items: drafts,
    meta,
    loading,
    error,
    canNext,
    next: loadMore,
    sentinelRef,
    reload,
    replaceItem,
    removeItem,
    updateItem
  } = usePagination<PostType>(getCurrentUserDrafts, {
    accessToken,
    setAccessToken,
    limit: LIMIT,
    mode: "infinite",
    autoLoadMore: true,
    rootMargin: "700px",
    resetKey,
  });

  const handleTogglePresentation = () => setShowMiniPosts((prev) => !prev);

  // initial spinner only
  if (loading && drafts.length === 0) return <Spinner />;

  return (
    <div className="md:mt-8">
      <h2 className="text-[var(--text1)] text-center text-4xl md:text-5xl mb-5 md:mb-10">
        {draftsContent.heading1}
      </h2>

      {drafts.length > 0 && (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleTogglePresentation}
            type="button"
            size="md"
            variant="primary"
            label="toggle draft presentation"
          >
            {showMiniPosts ? "Show draft titles" : "Show full drafts"}
          </Button>

          <Button onClick={reload} type="button" size="md" variant="secondary" label="reload drafts">
            Reload
          </Button>
        </div>
      )}

      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <section className="posts-section">
        {drafts.length === 0 && !loading && !error && (
          <div className="text-center posts-section-heading text-[var(--text1)]">
            <p className="text-sm md:text-lg">You haven't created any drafts yet.</p>
            <Button label="Make draft" className="text-sm mt-3">
              <Link to="/dashboard">Create Draft</Link>
            </Button>
          </div>
        )}

        {showMiniPosts
          ? drafts.map((draft) => (
              <Post
                key={draft.id}
                post={draft}
                onPostUpdated={(updated) => {
                  if (updated.published) {
                    removeItem(updated.id);     // published => remove from drafts list
                  } else {
                    replaceItem(updated.id, updated);
                  }
                }}
                onPostDeleted={(id) => removeItem(id)}
              />
            ))
          :drafts.map((draft) => <DraftCard key={draft.id} id={draft.id} draftTitle={draft.title} />)
          }

        {/* infinite scroll sentinel */}
        <div ref={sentinelRef} className="h-8" />

        {/* fallback load more */}
        {/* {canNext && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={loadMore}
              type="button"
              size="md"
              variant="secondary"
              label="load more drafts"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </Button>
          </div>
        )} */}

      </section>
        {meta && (
          <div className="mt-4 text-center text-sm opacity-70 text-[var(--text1)]">
            Showing {drafts.length} of {meta.total}
          </div>
        )}
    </div>
  );
};

export default Drafts;
