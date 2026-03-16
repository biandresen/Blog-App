import { useEffect, useMemo, useState } from "react";
import { postDeletedEvent } from "../../lib/events";

import PostCard from "./PostCard";
import Button from "../atoms/Button";

import { usePagination } from "../../hooks/usePagination";
import { getAllPosts } from "../../lib/axios";

import type { PostType } from "../../types/post.types";

import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";

const NAV_LIMIT = 4;

const RightSidebar = () => {
  const { accessToken, setAccessToken } = useAuth();
  const { language, t } = useLanguage();

  const [hiddenPostIds, setHiddenPostIds] = useState<number[]>([]);

  const args = useMemo(() => [language], [language]);
  const resetKey = useMemo(() => `right-nav:${language}`, [language]);

  const {
    items: posts,
    meta,
    loading,
    error,
    canPrev,
    canNext,
    prev,
    next,
    reload,
  } = usePagination<PostType>(getAllPosts, {
    accessToken,
    setAccessToken,
    limit: NAV_LIMIT,
    mode: "paged",
    args,
    resetKey,
  });

  const visiblePosts = useMemo(
    () => posts.filter((post) => !hiddenPostIds.includes(post.id)),
    [posts, hiddenPostIds]
  );

  const showInitialLoading = loading && visiblePosts.length === 0;
  const showEmptyState = !loading && visiblePosts.length === 0 && !error;
  const showPosts = visiblePosts.length > 0;

  const handleReload = () => {
    if (loading) return;
    reload();
  };

  const handlePrev = () => {
    if (!canPrev || loading) return;
    prev();
  };

  const handleNext = () => {
    if (!canNext || loading) return;
    next();
  };

  useEffect(() => {
    const handlePostDeleted = (event: Event) => {
      const customEvent = event as CustomEvent<{ postId?: number }>;
      const deletedPostId = customEvent.detail?.postId;

      if (typeof deletedPostId !== "number") return;

      // Remove instantly from UI
      setHiddenPostIds((prev) =>
        prev.includes(deletedPostId) ? prev : [...prev, deletedPostId]
      );

      // Then refetch current page so another post can fill the slot
      reload();
    };

    window.addEventListener(postDeletedEvent, handlePostDeleted);

    return () => {
      window.removeEventListener(postDeletedEvent, handlePostDeleted);
    };
  }, [reload]);

  useEffect(() => {
    // Clean up any ids that no longer exist in fetched results
    setHiddenPostIds((prev) =>
      prev.filter((hiddenId) => posts.some((post) => post.id === hiddenId))
    );
  }, [posts]);

  return (
    <aside className="bg-[var(--primary-shade)] absolute right-0 w-full h-[calc(100vh-3.8rem)] md:max-w-55 lg:max-w-65 md:static overflow-y-auto z-40">
      <h3 className="text-center text-3xl md:text-2xl mt-8 md:mt-16">
        {t("rightSidebar.heading")}
      </h3>

      <div className="flex md:flex-col flex-wrap items-center justify-center px-4 py-8 gap-4">
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        {showInitialLoading && (
          <p className="text-[var(--text2)] opacity-70">
            {t("rightSidebar.loading", "Loading...")}
          </p>
        )}

        {showEmptyState && (
          <div className="text-center">
            <h3 className="text-[var(--text2)] font-normal mb-5">
              {t("rightSidebar.empty.title")}
            </h3>

            <Button
              onClick={handleReload}
              label={t("rightSidebar.empty.action")}
              type="button"
              variant="primary"
              disabled={loading}
            >
              {loading
                ? t("rightSidebar.loading", "Loading...")
                : t("rightSidebar.empty.action")}
            </Button>
          </div>
        )}

        {showPosts &&
          visiblePosts.map((post) => (
            <PostCard key={post.id} id={post.id} title={post.title} />
          ))}

        {meta && showPosts && (
          <div className="w-full flex items-center justify-between gap-2 mt-4">
            <Button
              onClick={handlePrev}
              type="button"
              variant="secondary"
              label={t("rightSidebar.pagination.previous")}
              disabled={!canPrev || loading}
              className="text-sm!"
            >
              {t("rightSidebar.pagination.previous")}
            </Button>

            <div className="text-xs opacity-70 text-[var(--text2)] text-center">
              <div>{t("rightSidebar.pagination.page")}</div>
              <div>
                {meta.page} / {meta.totalPages}
              </div>
            </div>

            <Button
              onClick={handleNext}
              type="button"
              variant="secondary"
              label={t("rightSidebar.pagination.next")}
              disabled={!canNext || loading}
              className="text-sm!"
            >
              {t("rightSidebar.pagination.next")}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;