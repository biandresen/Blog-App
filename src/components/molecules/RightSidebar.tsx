import { useMemo } from "react";
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

  return (
    <aside className="bg-[var(--primary-shade)] absolute right-0 w-full h-[calc(100vh-3.8rem)] md:max-w-55 lg:max-w-65 md:static overflow-y-auto z-40">
      <h3 className="text-center text-3xl md:text-2xl mt-8 md:mt-16">
        {t("rightSidebar.heading")}
      </h3>

      <div className="flex md:flex-col flex-wrap items-center justify-center px-4 py-8 gap-4">
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {!loading && posts.length === 0 && !error && (
          <div className="text-center">
            <h3 className="text-[var(--text2)] font-normal mb-5">
              {t("rightSidebar.empty.title")}
            </h3>

            <Button
              onClick={reload}
              label={t("rightSidebar.empty.action")}
              type="button"
              variant="primary"
            >
              {t("rightSidebar.empty.action")}
            </Button>
          </div>
        )}

        {posts.map((post) => (
          <PostCard key={`${post.id}-${language}`} id={post.id} title={post.title} />
        ))}

        {meta && (
          <div className="w-full flex items-center justify-between gap-2 mt-4">
            <Button
              onClick={prev}
              type="button"
              variant="secondary"
              label={t("rightSidebar.pagination.previous")}
              disabled={!canPrev || loading}
              className="text-sm!"
            >
              {t("rightSidebar.pagination.previous")}
            </Button>

            <div className="text-xs opacity-70 text-[var(--text2)]">
              {t("rightSidebar.pagination.page")}
              <div>{meta.page} / {meta.totalPages}</div>
            </div>

            <Button
              onClick={next}
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