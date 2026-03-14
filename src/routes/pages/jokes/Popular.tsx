import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { PostType } from "../../../types/post.types";
import PostCard from "../../../components/molecules/PostCard";
import { getPopularPosts } from "../../../lib/axios";
import Post from "../../../components/organisms/Post";
import Button from "../../../components/atoms/Button";
import { useLanguage } from "../../../contexts/LanguageContext";

const Popular = () => {
  const { language, t } = useLanguage();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [showMiniPosts, setShowMiniPosts] = useState<boolean>(true);

  const postPresentation = showMiniPosts
    ? t("popular.actions.showFull")
    : t("popular.actions.showTitles");

  useEffect(() => {
  const fetchPopularPosts = async () => {
    try {
      const res = await getPopularPosts(language);
      setPosts(res.data);
    } catch (err: any) {
      console.error("Error fetching popular jokes:", err);
      toast.error(err.message || t("popular.states.failed"));
    }
  };

    fetchPopularPosts();
  }, [language, t]);

  const handleTogglePresentation = () => {
    setShowMiniPosts((prev) => !prev);
  };

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{t("popular.heading")}</h2>
      <p className="text-center text-[var(--text1)] opacity-70 -mt-6 mb-8">
        {t("popular.subtitle")}
      </p>

      <Button
        className="block mx-auto"
        onClick={handleTogglePresentation}
        type="button"
        size="md"
        variant="primary"
        label={postPresentation}
      >
        {postPresentation}
      </Button>

      <section className="posts-section">
        {!posts.length && (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">
              {t("popular.states.empty")}
            </h3>
          </div>
        )}

        {showMiniPosts
          ? posts.map((post) => (
              <PostCard
                key={post.id + post.title}
                id={post.id}
                title={post.title}
                likes={post.likes.length}
              />
            ))
          : posts.map((post) => <Post key={post.id} post={post} />)}
      </section>
    </div>
  );
};

export default Popular;