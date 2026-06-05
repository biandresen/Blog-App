import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { type JokeType } from "../../../types/joke.types";
import Joke from "../../../components/organisms/Joke";
import Spinner from "../../../components/atoms/Spinner";
import Button from "../../../components/atoms/Button";

import { getDailyJoke, recordDailyJokeView } from "../../../lib/axios";
import { safeRequest } from "../../../lib/auth";

import { useUser } from "../../../contexts/UserContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useLanguage } from "../../../contexts/LanguageContext";

const DailyJoke = () => {
  const [dailyJoke, setDailyJoke] = useState<JokeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setUser } = useUser();
  const { accessToken, setAccessToken } = useAuth();
  const { t } = useLanguage();

  const fetchDailyJoke = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getDailyJoke();
      setDailyJoke(res.data ?? null);
    } catch (err: any) {
      setError(err?.message ?? t("dailyJoke.states.failed"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchDailyJoke();
  }, [fetchDailyJoke]);

  useEffect(() => {
    if (!accessToken) return;

    let isMounted = true;

    const recordView = async () => {
      try {
        const res = await safeRequest(recordDailyJokeView, accessToken, setAccessToken);

        if (!isMounted) return;

        if (res?.data) {
          setUser((prev) => {
            if (!prev) return prev;

            return {
              ...prev,
              dailyJokeStreak: res.data.dailyJokeStreak,
              dailyJokeBestStreak: res.data.dailyJokeBestStreak,
              dailyJokeLastViewedAt: res.data.dailyJokeLastViewedAt,
            };
          });
        }
      } catch {
        // streak recording errors should not affect UI
      }
    };

    recordView();

    return () => {
      isMounted = false;
    };
  }, [accessToken, setAccessToken, setUser]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-[var(--text1)]">{error}</div>;
  }

  return (
    <div className="md:mt-8">
      <h2 className="jokes-heading">{t("dailyJoke.heading")}</h2>

      <p className="text-center text-[var(--text1)] opacity-70 -mt-4 mb-8">{t("dailyJoke.subtitle")}</p>

      <section className="jokes-section">
        {!dailyJoke ?
          <h3 className="jokes-section-heading text-[var(--text1)]">{t("dailyJoke.states.notFound")}</h3>
        : <Joke key={dailyJoke.id} joke={dailyJoke} />}
      </section>

      <div className="mt-8 flex justify-center">
        <Button
          type="button"
          onClick={() => navigate("/jokes/all-jokes")}
          className="bg-[var(--button3)] text-[var(--text0)]! px-6 py-2 hover:brightness-110"
          label={t("dailyJoke.actions.goToAllJokes")}
        >
          {t("dailyJoke.actions.goToAllJokes")}
        </Button>
      </div>
    </div>
  );
};

export default DailyJoke;
