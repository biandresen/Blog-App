import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { usePosts } from "../../../contexts/PostsContext";
import { useUser } from "../../../contexts/UserContext";
import { useLanguage } from "../../../contexts/LanguageContext";

import Spinner from "../../../components/atoms/Spinner";
import Post from "../../../components/organisms/Post";

import { getPost } from "../../../lib/axios";
import type { PostType } from "../../../types/post.types";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "../../../components/atoms/Button";
import { useAppLanguage } from "../../../hooks/useAppLanguage";

const SingleJoke = () => {
  const [localPost, setLocalPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notAvailableInLanguage, setNotAvailableInLanguage] = useState(false);

  const { id: postId } = useParams<{ id: string }>();
  const { accessToken } = useAuth();
  const { posts } = usePosts();
  const { user } = useUser();
  const { language, t } = useLanguage();
  const { setAppLanguage } = useAppLanguage();

  const parsedPostId = Number(postId);

  const contextPost = useMemo(() => {
    if (Number.isNaN(parsedPostId)) return undefined;
    return posts.find((p) => p.id === parsedPostId);
  }, [posts, parsedPostId]);

  useEffect(() => {
    let cancelled = false;

    const fetchSinglePost = async () => {
      if (!postId || Number.isNaN(parsedPostId)) {
        setLocalPost(null);
        setError(t("singleJoke.states.invalidId"));
        setNotAvailableInLanguage(false);
        return;
      }

      if (contextPost) {
        setLocalPost(contextPost);
        setError(null);
        setNotAvailableInLanguage(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setNotAvailableInLanguage(false);

        const res = await getPost(accessToken, parsedPostId, language);

        if (cancelled) return;

        const nextPost = res?.data ?? null;
        setLocalPost(nextPost);

        if (!nextPost) {
          setNotAvailableInLanguage(true);
        }
      } catch (err: any) {
        if (cancelled) return;

        const status = err?.response?.status ?? err?.response?.data?.statusCode;

        if (status === 404) {
          setLocalPost(null);
          setNotAvailableInLanguage(true);
          setError(null);
        } else {
          const message = err?.response?.data?.message || err?.message || t("singleJoke.states.failed");

          setError(message);
          setNotAvailableInLanguage(false);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchSinglePost();

    return () => {
      cancelled = true;
    };
  }, [postId, parsedPostId, language, contextPost, t]);

  const post = localPost;

  const isAuthor = post && post.authorId?.toString() === user?.id?.toString();

  const isDraft = post?.published === false;

  const handlePostUpdated = (updated: PostType) => {
    setLocalPost(updated);
  };

  const handlePostDeleted = () => {
    setLocalPost(null);
    setError(null);
    setNotAvailableInLanguage(false);
  };

  if (loading && !post) {
    return <Spinner />;
  }

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{t("singleJoke.heading")}</h2>

      <section className="posts-section">
        {error && (
          <div className="text-center text-[var(--text1)]">
            <h3 className="posts-section-heading text-[var(--error)]">{t("singleJoke.states.failed")}</h3>
            <p className="opacity-70 mt-2">{error}</p>
          </div>
        )}

        {!error && notAvailableInLanguage && (
          <div className="text-center text-[var(--text1)]">
            <h3 className="posts-section-heading">{t("singleJoke.states.notAvailableInLanguage")}</h3>

            <p className="opacity-70 mt-2">{t("singleJoke.states.tryAnotherLanguage")}</p>

            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => setAppLanguage(language === "EN" ? "NO" : "EN")}
                label="language change button"
              >
                {t("singleJoke.actions.changeLanguage")}
              </Button>
              <Button label="go to all jokes" className="ml-4">
                <NavLink to="/jokes">{t("singleJoke.actions.goToAllJokes")}</NavLink>
              </Button>
            </div>
          </div>
        )}

        {!error && !notAvailableInLanguage && !post && (
          <h3 className="posts-section-heading text-[var(--text1)]">{t("singleJoke.states.notFound")}</h3>
        )}

        {!error && !notAvailableInLanguage && post && isDraft && !isAuthor && (
          <h3 className="posts-section-heading text-[var(--text1)]">{t("singleJoke.states.privateDraft")}</h3>
        )}

        {!error && !notAvailableInLanguage && post && (!isDraft || isAuthor) && (
          <Post
            key={`${post.id}-${language}`}
            post={post}
            onPostUpdated={handlePostUpdated}
            onPostDeleted={handlePostDeleted}
          />
        )}
      </section>
    </div>
  );
};

export default SingleJoke;
