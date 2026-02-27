import { useEffect, useState } from "react";
import type { PostType } from "../../../types/post.types";
import Spinner from "../../../components/atoms/Spinner";
import Post from "../../../components/organisms/Post";
import { getFeaturedPost } from "../../../lib/axios";

type Props = {
  slug:
    | "joke-of-the-day"
    | "trending-week"
    | "most-commented-week"
    | "fastest-growing"
    | "top-creator-month";
  title: string;
  subtitle?: string;
};

export default function FeaturedPostTemplate({ slug, title, subtitle }: Props) {
  const [post, setPost] = useState<PostType | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getFeaturedPost(slug);
        const payload = res.data;

        if (!payload?.post) {
          setPost(null);
          setDate(null);
        } else {
          setPost(payload.post);
          setDate(payload.date);
        }
      } catch (e: any) {
        setError(e?.message ?? "Failed to load featured post");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-[var(--text1)]">{error}</div>;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{title}</h2>

      {subtitle && (
        <p className="text-center text-[var(--text1)] opacity-70 -mt-6 mb-8">{subtitle}</p>
      )}

      {date && (
        <p className="text-center text-sm text-[var(--text1)] opacity-60 -mt-4 mb-6">
          Featured for {new Date(date).toLocaleDateString()}
        </p>
      )}

      {!post ? (
        <div className="text-center text-[var(--text1)] opacity-70">Nothing featured yet.</div>
      ) : (
        <div className="posts-section">
          <Post post={post} />
        </div>
      )}
    </div>
  );
}