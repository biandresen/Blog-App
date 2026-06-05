import { useMemo, useState } from "react";

import Joke from "../../../components/organisms/Joke";
import Spinner from "../../../components/atoms/Spinner";
import JokePreviewCard from "../../../components/molecules/JokePreviewCard";
import Button from "../../../components/atoms/Button";

import { usePagination } from "../../../hooks/usePagination";
import { useAuth } from "../../../contexts/AuthContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getAllJokes } from "../../../lib/axios";
import type { JokeType } from "../../../types/joke.types";

const LIMIT = 15;

const AllJokes = () => {
  const [showMiniJokes, setShowMiniJokes] = useState(true);

  const { accessToken, setAccessToken } = useAuth();
  const { language, t, tf } = useLanguage();

  const args = useMemo(() => [language], [language]);
  const resetKey = useMemo(() => `all-jokes:${language}`, [language]);

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
  } = usePagination<JokeType>(getAllJokes, {
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
    setShowMiniJokes((prev) => !prev);
  };

  // Initial loading state
  if (loading && jokes.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="md:mt-8">
      <h2 className="jokes-heading">{t("allJokes.heading")}</h2>

      {/* ACTION BUTTONS */}

      <div className="flex gap-3 justify-center">
        <Button
          onClick={handleTogglePresentation}
          type="button"
          size="md"
          variant="primary"
          disabled={loading}
          label={showMiniJokes ? t("allJokes.actions.showTitles") : t("allJokes.actions.showFull")}
        >
          {showMiniJokes ? t("allJokes.actions.showTitles") : t("allJokes.actions.showFull")}
        </Button>

        <Button
          onClick={reload}
          type="button"
          size="md"
          variant="secondary"
          disabled={loading}
          label={t("allJokes.actions.reload")}
        >
          {loading ? t("allJokes.states.loading") : t("allJokes.actions.reload")}
        </Button>
      </div>

      {/* ERROR STATE */}

      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <section className="jokes-section">
        {/* EMPTY STATE */}

        {!jokes.length && !error && (
          <div>
            <h3 className="jokes-section-heading text-[var(--text1)]">{t("allJokes.states.empty")}</h3>
          </div>
        )}

        {/* JOKES */}

        {jokes.map((joke) =>
          showMiniJokes ?
            <Joke
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
            />
          : <JokePreviewCard key={joke.id} id={joke.id} title={joke.title} likes={joke.likes.length} />,
        )}

        {/* INFINITE SCROLL SENTINEL */}

        <div ref={sentinelRef} className="w-full h-px opacity-0 pointer-events-none" />

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
              {loading ? t("allJokes.states.loading") : t("allJokes.actions.loadMore")}
            </Button>
          </div>
        )}

        {/* META */}

        {meta && (
          <div className="text-center text-sm opacity-70 text-[var(--text1)] w-full">
            {tf("allJokes.states.showing", {
              shown: String(jokes.length),
              total: String(meta.total),
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllJokes;
