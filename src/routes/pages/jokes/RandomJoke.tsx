import { useCallback, useEffect, useRef, useState } from "react";

import { type PostType } from "../../../types/post.types";
import Post from "../../../components/organisms/Post";
import Button from "../../../components/atoms/Button";
import Spinner from "../../../components/atoms/Spinner";

import { getRandomPost } from "../../../lib/axios";
import { useLanguage } from "../../../contexts/LanguageContext";

const RandomJoke = () => {
  const { t } = useLanguage();

  const [randomJoke, setRandomJoke] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchRandomJoke = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      setLoading(true);
      setError(null);
      setRandomJoke(null);

      const res = await getRandomPost();

      if (!isMountedRef.current) return;
      setRandomJoke(res.data ?? null);
    } catch (err: any) {
      if (!isMountedRef.current) return;
      setError(err?.message ?? t("randomJoke.states.failed"));
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [t]);

  useEffect(() => {
    fetchRandomJoke();
  }, [fetchRandomJoke]);

  if (loading && !randomJoke) {
    return <Spinner />;
  }

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{t("randomJoke.heading")}</h2>

      <Button
        type="button"
        label={t("randomJoke.actions.getRandomJoke")}
        variant="tertiary"
        onClick={fetchRandomJoke}
        disabled={loading}
        className="block mx-auto"
      >
        {loading
          ? t("randomJoke.actions.loading")
          : t("randomJoke.actions.newJoke")}
      </Button>

      <section className="posts-section">
        {!loading && !randomJoke && !error && (
          <h3 className="posts-section-heading text-[var(--text1)]">
            {t("randomJoke.states.notFound")}
          </h3>
        )}

        {randomJoke && <Post key={randomJoke.id} post={randomJoke} />}
      </section>

      {error && (
        <p className="text-center text-sm text-[var(--error)]">
          {error}
        </p>
      )}
    </div>
  );
};

export default RandomJoke;