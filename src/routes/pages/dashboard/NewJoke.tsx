import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";

import { publishPost, saveDraft } from "../../../lib/axios";
import { safeRequest } from "../../../lib/auth";
import { getCharactersLeft, setInputErrors } from "../../../lib/utils";
import { MAX_CHARS } from "../../../lib/constants";

import { useAuth } from "../../../contexts/AuthContext";
import { usePosts } from "../../../contexts/PostsContext";
import { useLanguage } from "../../../contexts/LanguageContext";

import { useAutosaveDraft } from "../../../hooks/useAutosaveDraft";
import { useUnsavedChangesWarning } from "../../../hooks/useUnsavedChangesWarning";

const NewJoke = () => {
  const [postErrors, setPostErrors] = useState<string[]>([]);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useAuth();
  const { refreshPosts } = usePosts();
  const { language, t } = useLanguage();

  const {
    state,
    setState,
    resetDraft,
    isSaved,
  } = useAutosaveDraft(
    "new-joke-draft",
    {
      title: "",
      body: "",
      tags: "",
    },
    { debounceMs: 1200 }
  );

  const { title, body, tags } = state;

  const invalidForm = !title.trim() || !body.trim();

  const parsedTags = useMemo(
    () =>
      tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [tags]
  );

  const hasUnsavedContent = Boolean(title || body || tags);
  useUnsavedChangesWarning(hasUnsavedContent);

  const handleSaveDraft = async () => {
    if (invalidForm || isSavingDraft || isPublishing) return;

    if (!accessToken) {
      toast.error(t("newPost.toasts.mustBeLoggedInDraft"));
      return;
    }

    try {
      setIsSavingDraft(true);
      setPostErrors([]);

      const res = await safeRequest(
        saveDraft,
        accessToken,
        setAccessToken,
        title.trim(),
        body.trim(),
        parsedTags,
        language
      );

      if (res.statusCode !== 200) {
        throw new Error(res.message ?? t("newPost.toasts.requestFailed"));
      }

      toast.success(t("newPost.toasts.draftSaved"));

      await refreshPosts();
      resetDraft();
      setPostErrors([]);
      navigate("/dashboard/drafts");
    } catch (err: any) {
      if (err?.message?.includes("token")) {
        toast.error(t("newPost.toasts.sessionExpired"));
      }

      console.error("Failed to save draft", err);
      setPostErrors(setInputErrors(err?.response?.data?.errors));
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handlePublishPost = async () => {
    if (invalidForm || isSavingDraft || isPublishing) return;

    if (!accessToken) {
      toast.error(t("newPost.toasts.mustBeLoggedInPublish"));
      return;
    }

    try {
      setIsPublishing(true);
      setPostErrors([]);

      const res = await safeRequest(
        publishPost,
        accessToken,
        setAccessToken,
        title.trim(),
        body.trim(),
        parsedTags,
        language
      );

      if (res.statusCode !== 200) {
        throw new Error(res.message ?? t("newPost.toasts.requestFailed"));
      }

      toast.success(t("newPost.toasts.jokePublished"));

      await refreshPosts();
      resetDraft();
      setPostErrors([]);
      navigate("/jokes");
    } catch (err: any) {
      if (err?.message?.includes("token")) {
        toast.error(t("newPost.toasts.sessionExpired"));
      }

      console.error("Failed to publish joke", err);
      setPostErrors(setInputErrors(err?.response?.data?.errors));
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="bg-[var(--primary)] p-3 md:p-8 rounded-2xl max-w-120 md:min-w-1/2 mx-auto md:mt-10">
      <h2 className="text-3xl md:text-5xl text-center my-5">
        {t("newPost.heading")}
      </h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <Input
            className="text-[var(--text2)] rounded-xl md:text-2xl! mb-2"
            id="postTitle"
            label={t("newPost.fields.title")}
            type="text"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS.TITLE) {
                setState((prev) => ({ ...prev, title: e.target.value }));
              }
            }}
            placeholder={t("newPost.placeholders.title")}
            maxLength={MAX_CHARS.TITLE}
            required
          />
          <span className="absolute bottom-2 right-2 opacity-80 text-xs">
            {getCharactersLeft(title, MAX_CHARS.TITLE)}
          </span>
        </div>

        <label
          htmlFor="body"
          className="text-[var(--text2)] md:text-2xl font-bold md:my-2"
        >
          {t("newPost.fields.body")}
        </label>

        <div className="relative">
          <textarea
            className="md:text-2xl rounded-2xl bg-[var(--bg)] w-full text-[var(--text1)] px-3 font-normal md:h-50 py-2"
            title={t("newPost.fields.body")}
            value={body}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS.BODY) {
                setState((prev) => ({ ...prev, body: e.target.value }));
              }
            }}
            placeholder={t("newPost.placeholders.body")}
            id="body"
            maxLength={MAX_CHARS.BODY}
          />
          <span className="absolute bottom-2 right-5 opacity-80 text-xs">
            {getCharactersLeft(body, MAX_CHARS.BODY)}
          </span>
        </div>

        <div className="relative">
          <Input
            className="text-[var(--text2)] rounded-xl text-sm md:text-xl! mb-2 font-normal!"
            id="tags"
            label={t("newPost.fields.tags")}
            type="text"
            value={tags}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS.TAGS) {
                setState((prev) => ({ ...prev, tags: e.target.value }));
              }
            }}
            maxLength={MAX_CHARS.TAGS}
            placeholder={t("newPost.placeholders.tags")}
          />
          <span className="absolute bottom-2 right-2 opacity-80 text-xs">
            {getCharactersLeft(tags, MAX_CHARS.TAGS)}
          </span>
        </div>

        <div className="mb-2 text-right text-xs opacity-80">
          {hasUnsavedContent
            ? isSaved
              ? t("newPost.draftSaved", "Draft saved")
              : t("newPost.savingDraft", "Saving draft...")
            : ""}
        </div>

        <ul className="text-[0.9rem] text-[var(--error)] my-2">
          {postErrors.map((err, index) => (
            <li key={`${index}-${err}`}>• {err}</li>
          ))}
        </ul>

        <div className="flex flex-col pb-3 md:flex-row justify-space-between md:gap-10 md:my-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSaveDraft}
            className="w-full mt-4"
            disabled={invalidForm || isSavingDraft || isPublishing}
            label={t("newPost.actions.saveDraft")}
          >
            {isSavingDraft
              ? t("common.loading")
              : t("newPost.actions.saveDraft")}
          </Button>

          <Button
            type="button"
            variant="tertiary"
            onClick={handlePublishPost}
            className="w-full mt-4"
            disabled={invalidForm || isPublishing || isSavingDraft}
            label={t("newPost.actions.publishJoke")}
          >
            {isPublishing
              ? t("common.loading")
              : t("newPost.actions.publishJoke")}
          </Button>
        </div>
      </form>

      <p className="text-center text-xs md:text-sm text-[var(--text2)] opacity-80 mb-0">
        {t("newPost.currentLanguageLabel")} {language}
      </p>
    </div>
  );
};

export default NewJoke;