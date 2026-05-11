import { useCallback, useEffect, useState } from "react";

import { type PostType } from "../../../types/post.types";
import Post from "../../../components/organisms/Post";
import Spinner from "../../../components/atoms/Spinner";

import { getDailyPost, recordDailyJokeView } from "../../../lib/axios";
import { safeRequest } from "../../../lib/auth";

import { useUser } from "../../../contexts/UserContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useLanguage } from "../../../contexts/LanguageContext";

const DailyJoke = () => {
  const [dailyJoke, setDailyJoke] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useUser();
  const { accessToken, setAccessToken } = useAuth();
  const { t } = useLanguage();

  const fetchDailyJoke = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getDailyPost();
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
        const res = await safeRequest(
          recordDailyJokeView,
          accessToken,
          setAccessToken
        );

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
    return (
      <div className="text-center text-[var(--text1)]">
        {error}
      </div>
    );
  }

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{t("dailyJoke.heading")}</h2>

      <p className="text-center text-[var(--text1)] opacity-70 -mt-4 mb-8">
        {t("dailyJoke.subtitle")}
      </p>

      <section className="posts-section">
        {!dailyJoke ? (
          <h3 className="posts-section-heading text-[var(--text1)]">
            {t("dailyJoke.states.notFound")}
          </h3>
        ) : (
          <Post key={dailyJoke.id} post={dailyJoke} />
        )}
      </section>
    </div>
  );
};

export default DailyJoke;