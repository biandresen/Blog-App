import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { usePosts } from "../../../contexts/PostsContext";
import { useUser } from "../../../contexts/UserContext";
import { useLanguage } from "../../../contexts/LanguageContext";

import Spinner from "../../../components/atoms/Spinner";
import Post from "../../../components/organisms/Post";

import { getPost } from "../../../lib/axios";
import type { PostType } from "../../../types/post.types";

const SingleJoke = () => {
  const [localPost, setLocalPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notAvailableInLanguage, setNotAvailableInLanguage] = useState(false);

  const { id: postId } = useParams<{ id: string }>();
  const { posts, refreshPosts } = usePosts();
  const { user } = useUser();
  const { language, t } = useLanguage();

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

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
        setNotAvailableInLanguage(false);
        setError(t("singleJoke.states.invalidId", "Invalid joke id"));
        return;
      }

      if (contextPost) {
        setLocalPost(contextPost);
        setNotAvailableInLanguage(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setNotAvailableInLanguage(false);

        const res = await getPost(parsedPostId, language);

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
          const message =
            err?.response?.data?.message ||
            err?.message ||
            t("singleJoke.states.failed", "Failed to load joke");

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
  const isAuthor = post?.authorId?.toString() === user?.id?.toString();
  const isDraft = post?.published === false;

  if (loading) return <Spinner />;

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">
        {t("singleJoke.heading", "Joke details")}
      </h2>

      <section className="posts-section">
        {error && (
          <div className="text-center text-[var(--text1)]">
            <h3 className="posts-section-heading text-[var(--error)]">
              {t("singleJoke.states.failed", "Failed to load joke")}
            </h3>
            <p className="opacity-70 mt-2">{error}</p>
          </div>
        )}

        {!error && notAvailableInLanguage && (
          <div className="text-center text-[var(--text1)]">
            <h3 className="posts-section-heading">
              {t(
                "singleJoke.states.notAvailableInLanguage",
                "This joke is not available in the selected language."
              )}
            </h3>

            <p className="opacity-70 mt-2">
              {t(
                "singleJoke.states.tryAnotherLanguage",
                "Try switching language or go back to the jokes list."
              )}
            </p>

            <div className="mt-4 flex justify-center">
              <NavLink
                to="/jokes"
                className="inline-block rounded-full px-4 py-2 bg-[var(--primary)] text-[var(--text2)]"
              >
                {t("singleJoke.actions.goToAllJokes", "Go to all jokes")}
              </NavLink>
            </div>
          </div>
        )}

        {!error && !notAvailableInLanguage && !post && (
          <h3 className="posts-section-heading text-[var(--text1)]">
            {t("singleJoke.states.notFound", "Joke not found")}
          </h3>
        )}

        {!error && !notAvailableInLanguage && post && isDraft && !isAuthor && (
          <h3 className="posts-section-heading text-[var(--text1)]">
            {t("singleJoke.states.privateDraft", "This draft is private")}
          </h3>
        )}

        {!error && !notAvailableInLanguage && post && (!isDraft || isAuthor) && (
          <Post
            key={`${post.id}-${language}`}
            post={post}
            onPostUpdated={(updated) => setLocalPost(updated)}
          />
        )}
      </section>
    </div>
  );
};

export default SingleJoke;