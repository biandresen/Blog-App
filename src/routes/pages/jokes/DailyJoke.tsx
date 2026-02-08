import { useCallback, useEffect, useState } from "react";
import { type PostType } from "../../../types/post.types";
import Post from "../../../components/organisms/Post";
import { getDailyPost } from "../../../lib/axios";

// Hashing in the backend for deterministic selection | Same post every day for everyone
const DailyJoke = () => {
  const [dailyJoke, setdailyJoke] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDailyJoke = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getDailyPost()
      setdailyJoke(res.data ?? null);
    } catch (err: any) {
      setError(err?.message ?? "Failed to fetch daily joke");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDailyJoke();
  }, [fetchDailyJoke]);

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">DAILY JOKE</h2>

      <section className="posts-section">
        {!dailyJoke && <h3 className="posts-section-heading text-[var(--text1)]">Joke not found</h3>}
        {dailyJoke && <Post key={dailyJoke.id} post={dailyJoke} />}
      </section>

       {error && <p className="text-center text-sm text-[var(--error)]">{error}</p>}

    </div>
  );
};

export default DailyJoke;
