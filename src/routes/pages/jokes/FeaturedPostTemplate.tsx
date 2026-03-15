import { useEffect, useState } from "react";
import type { PostType } from "../../../types/post.types";
import Spinner from "../../../components/atoms/Spinner";
import Post from "../../../components/organisms/Post";
import { getFeaturedPost } from "../../../lib/axios";
import { useLanguage } from "../../../contexts/LanguageContext";

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

  const { language, t } = useLanguage();

  useEffect(() => {
    let isActive = true;

    setPost(null);
    setDate(null);
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        const res = await getFeaturedPost(slug, language);
        const payload = res.data;

        if (!isActive) return;

        if (!payload?.post) {
          setPost(null);
          setDate(null);
          return;
        }

        setPost(payload.post);
        setDate(payload.date ?? null);
      } catch (err: any) {
        if (!isActive) return;
        setError(err?.message ?? t("featured.failedToLoad"));
      } finally {
        if (isActive) setLoading(false);
      }
    };

    run();

    return () => {
      isActive = false;
    };
  }, [slug, language, t]);

  if (loading) return <Spinner />;

  if (error) {
    return <div className="text-center text-[var(--text1)]">{error}</div>;
  }

  const formattedDate = date
    ? new Date(date).toLocaleDateString(language === "NO" ? "nb-NO" : "en-GB")
    : null;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{title}</h2>

      {subtitle && (
        <p className="text-center text-[var(--text1)] opacity-70 -mt-3 mb-8">
          {subtitle}
        </p>
      )}

      {formattedDate && (
        <p className="text-center text-sm text-[var(--text1)] opacity-60 -mt-4 mb-6">
          {t("featured.featuredFor", "Featured for")} {formattedDate}
        </p>
      )}

      {!post ? (
        <div className="text-center text-[var(--text1)] opacity-70">
          {t("featured.noJoke")}
        </div>
      ) : (
        <div className="posts-section">
          <Post key={`${post.id}-${language}`} post={post} />
        </div>
      )}
    </div>
  );
}