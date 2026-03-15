import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { usePagination } from "../../../hooks/usePagination";
import { getCurrentUserDrafts } from "../../../lib/axios";

import Spinner from "../../../components/atoms/Spinner";
import Button from "../../../components/atoms/Button";
import DraftCard from "../../../components/molecules/DraftCard";
import Post from "../../../components/organisms/Post";

import type { PostType } from "../../../types/post.types";

const LIMIT = 15;

const Drafts = () => {
  const { accessToken, setAccessToken } = useAuth();
  const { language, t, tf } = useLanguage();
  const [showMiniPosts, setShowMiniPosts] = useState(true);

  // If the user is not authenticated, do not initialize pagination requests.
  if (!accessToken) {
    return (
      <p className="text-center mt-10 text-[var(--text1)]">
        {t("drafts.authRequired")}
      </p>
    );
  }

  // Stable pagination config values.
  const args = useMemo(() => [language], [language]);
  const resetKey = useMemo(() => `my-drafts:${language}`, [language]);

  const {
    items: drafts,
    meta,
    loading,
    error,
    sentinelRef,
    reload,
    replaceItem,
    removeItem,
  } = usePagination<PostType>(getCurrentUserDrafts, {
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

  // Initial page load only
  if (loading && drafts.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="md:mt-8">
      <h2 className="text-[var(--text1)] text-center text-4xl md:text-5xl mb-5 md:mb-10">
        {t("drafts.heading")}
      </h2>

      {drafts.length > 0 && (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleTogglePresentation}
            type="button"
            size="md"
            variant="primary"
            label={showMiniPosts ? t("drafts.toggleShowTitles") : t("drafts.toggleShowFull")}
            disabled={loading}
          >
            {showMiniPosts ? t("drafts.toggleShowTitles") : t("drafts.toggleShowFull")}
          </Button>

          <Button
            onClick={reload}
            type="button"
            size="md"
            variant="secondary"
            label={t("drafts.reload")}
            disabled={loading}
          >
            {loading ? t("common.loading") : t("drafts.reload")}
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
            <p className="text-sm md:text-lg">{t("drafts.empty")}</p>

            <Link to="/dashboard" className="inline-block mt-3">
              <Button
                type="button"
                label={t("drafts.createDraft")}
                className="text-sm"
              >
                {t("drafts.createDraft")}
              </Button>
            </Link>
          </div>
        )}

        {drafts.map((draft) =>
          showMiniPosts ? (
            <Post
              key={draft.id}
              post={draft}
              onPostUpdated={(updated) => {
                if (updated.published) {
                  removeItem(updated.id);
                } else {
                  replaceItem(updated.id, updated);
                }
              }}
              onPostDeleted={(id) => removeItem(id)}
            />
          ) : (
            <DraftCard key={draft.id} id={draft.id} draftTitle={draft.title} />
          )
        )}

        <div ref={sentinelRef} className="h-8" />
      </section>

      {meta && (
        <div className="mt-4 text-center text-sm opacity-70 text-[var(--text1)]">
          {tf("drafts.showing", {
            shown: String(drafts.length),
            total: String(meta.total),
          })}
        </div>
      )}
    </div>
  );
};

export default Drafts;