import { useCallback, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Spinner from "../../../components/atoms/Spinner";
import Button from "../../../components/atoms/Button";
import Post from "../../../components/organisms/Post";
import PostCard from "../../../components/molecules/PostCard";

import { usePagination } from "../../../hooks/usePagination";
import { getAllUserPosts } from "../../../lib/axios";
import type { PostType } from "../../../types/post.types";
import { useUser } from "../../../contexts/UserContext";
import { useLanguage } from "../../../contexts/LanguageContext";

const LIMIT = 15;

const MyJokes = () => {
  const { user } = useUser();
  const { language, t, tf } = useLanguage();
  const [showMiniPosts, setShowMiniPosts] = useState(true);

  const userId = user?.id ? Number(user.id) : null;

  const noopSetAccessToken = useCallback(() => {}, []);

  const args = useMemo(() => (userId ? [userId, language] : []), [userId, language]);
  const resetKey = useMemo(() => `my-jokes:${userId ?? "anon"}:${language}`, [userId, language]);

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
    setAccessToken: noopSetAccessToken,
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
    <div className="text-center text-[var(--text1)]">
      <p className="posts-section-heading">{t("myJokes.authRequired")}</p>

      <NavLink
        to="/login"
        className="inline-block mt-3 rounded-full px-4 py-2 text-sm bg-[var(--primary)] text-[var(--text2)]"
      >
        {t("myJokes.login")}
      </NavLink>
    </div>
  );
}

  if (loading && posts.length === 0) return <Spinner />;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{t("myJokes.heading")}</h2>

      {posts.length > 0 && (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setShowMiniPosts((p) => !p)}
            type="button"
            size="md"
            variant="primary"
            label={showMiniPosts ? t("myJokes.toggleShowFull") : t("myJokes.toggleShowTitles")}
          >
            {showMiniPosts ? t("myJokes.toggleShowFull") : t("myJokes.toggleShowTitles")}
          </Button>

          <Button
            onClick={reload}
            type="button"
            size="md"
            variant="secondary"
            label={t("myJokes.reload")}
          >
            {t("myJokes.reload")}
          </Button>
        </div>
      )}

      {error && <div className="mt-4 text-center text-red-500">{error}</div>}

      <section className="posts-section flex-col">
        {posts.length === 0 && !loading && !error && (
          <div className="text-center posts-section-heading text-[var(--text1)]">
            <p className="text-sm md:text-lg">{t("myJokes.empty")}</p>
            <Button label={t("myJokes.createJoke")} className="text-sm mt-3">
              <Link to="/dashboard">{t("myJokes.createJoke")}</Link>
            </Button>
          </div>
        )}

        {showMiniPosts
          ? posts.map((post) => (
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
            ))
          : posts.map((post) => (
              <PostCard key={post.id} id={post.id} title={post.title} likes={post.likes.length} />
            ))}

        <div ref={sentinelRef} className="h-8" />

        {canNext && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={loadMore}
              type="button"
              size="md"
              variant="secondary"
              disabled={loading}
              label={t("myJokes.loadMore")}
            >
              {loading ? t("myJokes.loading") : t("myJokes.loadMore")}
            </Button>
          </div>
        )}

        {meta && (
          <div className="text-center text-sm opacity-70 text-[var(--text1)]">
            {tf("myJokes.showing", {
              shown: String(posts.length),
              total: String(meta.total),
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyJokes;