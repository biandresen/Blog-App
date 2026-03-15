import { useMemo, useState } from "react";

import Post from "../../../components/organisms/Post";
import Spinner from "../../../components/atoms/Spinner";
import PostCard from "../../../components/molecules/PostCard";
import Button from "../../../components/atoms/Button";

import { usePagination } from "../../../hooks/usePagination";
import { useAuth } from "../../../contexts/AuthContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getAllPosts } from "../../../lib/axios";
import type { PostType } from "../../../types/post.types";

const LIMIT = 15;

const AllJokes = () => {
  const [showMiniPosts, setShowMiniPosts] = useState(true);

  const { accessToken, setAccessToken } = useAuth();
  const { language, t, tf } = useLanguage();

  const args = useMemo(() => [language], [language]);
  const resetKey = useMemo(() => `all-jokes:${language}`, [language]);

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
    accessToken,
    setAccessToken,
    limit: LIMIT,
    args,
    mode: "infinite",
    autoLoadMore: true,
    rootMargin: "700px",
    resetKey,
  });

  const handleTogglePresentation = () => {
    setShowMiniPosts((prev) => !prev);
  };

  // Initial loading state
  if (loading && posts.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{t("allJokes.heading")}</h2>

      {/* ACTION BUTTONS */}

      <div className="flex gap-3 justify-center">
        <Button
          onClick={handleTogglePresentation}
          type="button"
          size="md"
          variant="primary"
          disabled={loading}
          label={
            showMiniPosts
              ? t("allJokes.actions.showTitles")
              : t("allJokes.actions.showFull")
          }
        >
          {showMiniPosts
            ? t("allJokes.actions.showTitles")
            : t("allJokes.actions.showFull")}
        </Button>

        <Button
          onClick={reload}
          type="button"
          size="md"
          variant="secondary"
          disabled={loading}
          label={t("allJokes.actions.reload")}
        >
          {loading
            ? t("allJokes.states.loading")
            : t("allJokes.actions.reload")}
        </Button>
      </div>

      {/* ERROR STATE */}

      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <section className="posts-section">
        {/* EMPTY STATE */}

        {!posts.length && !error && (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">
              {t("allJokes.states.empty")}
            </h3>
          </div>
        )}

        {/* POSTS */}

        {posts.map((post) =>
          showMiniPosts ? (
            <Post
              key={post.id}
              post={post}
              onPostUpdated={(updated) => {
                if (!updated.published) {
                  removeItem(updated.id);
                } else {
                  replaceItem(updated.id, updated);
                }
              }}
              onPostDeleted={(id) => removeItem(id)}
            />
          ) : (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              likes={post.likes.length}
            />
          )
        )}

        {/* INFINITE SCROLL SENTINEL */}

        <div ref={sentinelRef} className="h-8" />

        {/* LOAD MORE BUTTON (fallback for scroll) */}

        {canNext && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={loadMore}
              type="button"
              size="md"
              variant="secondary"
              disabled={loading}
              label={t("allJokes.actions.loadMore")}
            >
              {loading
                ? t("allJokes.states.loading")
                : t("allJokes.actions.loadMore")}
            </Button>
          </div>
        )}

        {/* META */}

        {meta && (
          <div className="text-center text-sm opacity-70 text-[var(--text1)] w-full">
            {tf("allJokes.states.showing", {
              shown: String(posts.length),
              total: String(meta.total),
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllJokes;