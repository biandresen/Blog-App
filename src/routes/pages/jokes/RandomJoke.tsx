import { useCallback, useEffect, useState } from "react";
import { type PostType } from "../../../types/post.types";
import Post from "../../../components/organisms/Post";
import Button from "../../../components/atoms/Button";
import { getRandomPost } from "../../../lib/axios";

const RandomJoke = () => {
  const [randomJoke, setRandomJoke] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomJoke = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getRandomPost(); // { statusCode, data, ... }
      console.log("Random joke response:", res);
      setRandomJoke(res.data ?? null);
    } catch (err: any) {
      setError(err?.message ?? "Failed to fetch random joke");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomJoke();
  }, [fetchRandomJoke]);

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">RANDOM JOKE</h2>
      <Button
        label="Get random joke"
        variant="tertiary"
        onClick={fetchRandomJoke}
        disabled={loading}
        className="block mx-auto"
      >

        {loading ? "Loading..." : "New joke"}
      </Button>

      <section className="posts-section">
        {!randomJoke && <h3 className="posts-section-heading text-[var(--text1)]">Joke not found</h3>}
       {error && <p className="mt-3 text-sm text-[var(--error)]">{error}</p>}
        {randomJoke && <Post key={randomJoke.id} post={randomJoke} />}
      </section>

    </div>
  );
};

export default RandomJoke;
