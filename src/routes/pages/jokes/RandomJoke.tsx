import { useCallback, useEffect, useState } from "react";

import { type PostType } from "../../../types/post.types";
import Post from "../../../components/organisms/Post";
import Button from "../../../components/atoms/Button";
import { getRandomPost } from "../../../lib/axios";
import { useLanguage } from "../../../contexts/LanguageContext";

const RandomJoke = () => {
  const { t } = useLanguage();

  const [randomJoke, setRandomJoke] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomJoke = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getRandomPost();
      setRandomJoke(res.data ?? null);
    } catch (err: any) {
      setError(err?.message ?? t("randomJoke.states.failed"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchRandomJoke();
  }, [fetchRandomJoke]);

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{t("randomJoke.heading")}</h2>

      <Button
        label={t("randomJoke.actions.getRandomJoke")}
        variant="tertiary"
        onClick={fetchRandomJoke}
        disabled={loading}
        className="block mx-auto"
      >
        {loading ? t("randomJoke.actions.loading") : t("randomJoke.actions.newJoke")}
      </Button>

      <section className="posts-section">
        {!randomJoke && (
          <h3 className="posts-section-heading text-[var(--text1)]">
            {t("randomJoke.states.notFound")}
          </h3>
        )}

        {randomJoke && <Post key={randomJoke.id} post={randomJoke} />}
      </section>

      {error && <p className="text-center text-sm text-[var(--error)]">{error}</p>}
    </div>
  );
};

export default RandomJoke;