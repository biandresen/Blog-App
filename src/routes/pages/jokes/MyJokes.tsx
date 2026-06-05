import { useCallback, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Spinner from "../../../components/atoms/Spinner";
import Button from "../../../components/atoms/Button";
import Joke from "../../../components/organisms/Joke";
import JokePreviewCard from "../../../components/molecules/JokePreviewCard";

import { usePagination } from "../../../hooks/usePagination";
import { getAllUserJokes } from "../../../lib/axios";

import type { JokeType } from "../../../types/joke.types";

import { useUser } from "../../../contexts/UserContext";
import { useLanguage } from "../../../contexts/LanguageContext";

const LIMIT = 15;

const MyJokes = () => {
  const { user } = useUser();
  const { language, t, tf } = useLanguage();

  const [showMiniJokes, setShowMiniJokes] = useState(false);

  const userId = user?.id ? Number(user.id) : null;

  const noopSetAccessToken = useCallback(() => {}, []);

  const args = useMemo(() => (userId ? [userId, language] : []), [userId, language]);

  const resetKey = useMemo(() => `my-jokes:${userId ?? "anon"}:${language}`, [userId, language]);

  const {
    items: jokes,
    meta,
    loading,
    error,
    canNext,
    next: loadMore,
    sentinelRef,
    reload,
    replaceItem,
    removeItem,
  } = usePagination<JokeType>(getAllUserJokes, {
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

  const handleTogglePresentation = () => {
    setShowMiniJokes((prev) => !prev);
  };

  if (!userId) {
    return (
      <div className="text-center text-[var(--text1)]">
        <p className="jokes-section-heading">{t("myJokes.authRequired")}</p>

        <NavLink
          to="/login"
          className="inline-block mt-3 rounded-full px-4 py-2 text-sm bg-[var(--primary)] text-[var(--text2)]"
        >
          {t("myJokes.login")}
        </NavLink>
      </div>
    );
  }

  if (loading && jokes.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="md:mt-8">
      <h2 className="jokes-heading">{t("myJokes.heading")}</h2>

      {jokes.length > 0 && (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleTogglePresentation}
            type="button"
            size="md"
            variant="primary"
            disabled={loading}
            label={showMiniJokes ? t("myJokes.toggleShowFull") : t("myJokes.toggleShowTitles")}
          >
            {showMiniJokes ? t("myJokes.toggleShowFull") : t("myJokes.toggleShowTitles")}
          </Button>

          <Button
            onClick={reload}
            type="button"
            size="md"
            variant="secondary"
            disabled={loading}
            label={t("myJokes.reload")}
          >
            {loading ? t("myJokes.loading") : t("myJokes.reload")}
          </Button>
        </div>
      )}

      {error && <div className="mt-4 text-center text-red-500">{error}</div>}

      <section
        className={
          showMiniJokes ? "jokes-section flex-col" : (
            "jokes-section grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          )
        }
      >
        {jokes.length === 0 && !loading && !error && (
          <div className="text-center jokes-section-heading text-[var(--text1)]">
            <p className="text-sm md:text-lg">{t("myJokes.empty")}</p>

            <Link to="/dashboard" className="inline-block mt-3">
              <Button type="button" className="text-sm" label={t("myJokes.createJoke")}>
                {t("myJokes.createJoke")}
              </Button>
            </Link>
          </div>
        )}

        {jokes.map((joke) =>
          showMiniJokes ?
            <JokePreviewCard key={joke.id} id={joke.id} title={joke.title} likes={joke.likes.length} />
          : <Joke
              key={joke.id}
              joke={joke}
              onJokeUpdated={(updated) => {
                if (!updated.published) {
                  removeItem(updated.id);
                } else {
                  replaceItem(updated.id, updated);
                }
              }}
              onJokeDeleted={(id) => removeItem(id)}
            />,
        )}

        <div ref={sentinelRef} className="w-full h-px opacity-0 pointer-events-none" />

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
              shown: String(jokes.length),
              total: String(meta.total),
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyJokes;
