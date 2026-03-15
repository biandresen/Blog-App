import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { PostType } from "../../../types/post.types";
import PostCard from "../../../components/molecules/PostCard";
import Post from "../../../components/organisms/Post";
import Button from "../../../components/atoms/Button";
import Spinner from "../../../components/atoms/Spinner";

import { getPopularPosts } from "../../../lib/axios";
import { useLanguage } from "../../../contexts/LanguageContext";

const Popular = () => {
  const { language, t } = useLanguage();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [showMiniPosts, setShowMiniPosts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const postPresentation = showMiniPosts
    ? t("popular.actions.showFull")
    : t("popular.actions.showTitles");

  useEffect(() => {
    let isActive = true;

    const fetchPopularPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getPopularPosts(language);

        if (!isActive) return;

        setPosts(res.data ?? []);
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

    fetchPopularPosts();

    return () => {
      isActive = false;
    };
  }, [language, t]);

  const handleTogglePresentation = () => {
    if (loading) return;
    setShowMiniPosts((prev) => !prev);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-[var(--text1)]">{error}</div>;
  }

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{t("popular.heading")}</h2>

      <p className="text-center text-[var(--text1)] opacity-70 -mt-6 mb-8">
        {t("popular.subtitle")}
      </p>

      {posts.length > 0 && (
        <Button
          className="block mx-auto"
          onClick={handleTogglePresentation}
          type="button"
          size="md"
          variant="primary"
          label={postPresentation}
          disabled={loading}
        >
          {postPresentation}
        </Button>
      )}

      <section
        className={
          showMiniPosts
            ? "posts-section grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4"
            : "posts-section"
        }
      >
        {!posts.length ? (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">
              {t("popular.states.empty")}
            </h3>
          </div>
        ) : (
          posts.map((post) =>
            showMiniPosts ? (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                likes={post.likes.length}
              />
            ) : (
              <Post key={post.id} post={post} />
            )
          )
        )}
      </section>
    </div>
  );
};

export default Popular;