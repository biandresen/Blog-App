import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { JokeType } from "../../../types/joke.types";
import JokePreviewCard from "../../../components/molecules/JokePreviewCard";
import Joke from "../../../components/organisms/Joke";
import Button from "../../../components/atoms/Button";
import Spinner from "../../../components/atoms/Spinner";

import { getPopularJokes } from "../../../lib/axios";
import { useLanguage } from "../../../contexts/LanguageContext";

const Popular = () => {
  const { language, t } = useLanguage();

  const [jokes, setJokes] = useState<JokeType[]>([]);
  const [showMiniJokes, setShowMiniJokes] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const jokePresentation = showMiniJokes ? t("popular.actions.showFull") : t("popular.actions.showTitles");

  useEffect(() => {
    let isActive = true;

    const fetchPopularJokes = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getPopularJokes(language);

        if (!isActive) return;

        setJokes(res.data ?? []);
      } catch (err: any) {
        if (!isActive) return;

        const message = err?.message || t("popular.states.failed");
        setError(message);
        toast.error(message);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchPopularJokes();

    return () => {
      isActive = false;
    };
  }, [language, t]);

  const handleTogglePresentation = () => {
    if (loading) return;
    setShowMiniJokes((prev) => !prev);
  };

  const handleJokeDeleted = (deletedJokeId: number) => {
    setJokes((prev) => prev.filter((joke) => joke.id !== deletedJokeId));
  };

  const handleJokeUpdated = (updatedJoke: JokeType) => {
    setJokes((prev) =>
      prev
        .map((joke) => (joke.id === updatedJoke.id ? updatedJoke : joke))
        .filter((joke) => joke.published !== false),
    );
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-[var(--text1)]">{error}</div>;
  }

  return (
    <div className="md:mt-8">
      <h2 className="jokes-heading">{t("popular.heading")}</h2>

      <p className="text-center text-[var(--text1)] opacity-70 -mt-6 mb-8">{t("popular.subtitle")}</p>

      {jokes.length > 0 && (
        <Button
          className="block mx-auto"
          onClick={handleTogglePresentation}
          type="button"
          size="md"
          variant="primary"
          label={jokePresentation}
          disabled={loading}
        >
          {jokePresentation}
        </Button>
      )}

      <section
        className={
          showMiniJokes ?
            "jokes-section grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4"
          : "jokes-section"
        }
      >
        {!jokes.length ?
          <div>
            <h3 className="jokes-section-heading text-[var(--text1)]">{t("popular.states.empty")}</h3>
          </div>
        : jokes.map((joke) =>
            showMiniJokes ?
              <JokePreviewCard key={joke.id} id={joke.id} title={joke.title} likes={joke.likes.length} />
            : <Joke
                key={joke.id}
                joke={joke}
                onJokeUpdated={handleJokeUpdated}
                onJokeDeleted={handleJokeDeleted}
              />,
          )
        }
      </section>
    </div>
  );
};

export default Popular;
