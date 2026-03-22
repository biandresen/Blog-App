import { useState } from "react";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";

import { type CommentFormProps } from "../../types/components.types";
import { addComment } from "../../lib/axios";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { safeRequest } from "../../lib/auth";
import { useSubmitOnEnter } from "../../hooks/useSubmitOnEnter";
import { getCharactersLeft } from "../../lib/utils";
import { MAX_CHARS } from "../../lib/constants";
import { toastApiError } from "../../lib/apiErrors";
import { moderateFields } from "../../lib/moderation";
import { useModeration } from "../../contexts/ModerationContext";

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const { accessToken, setAccessToken } = useAuth();
  const { t } = useLanguage();
  const { terms } = useModeration();

  const trimmedBody = body.trim();
  const formError = trimmedBody === "";

  const submitComment = async () => {
    if (loading) return;

    if (!accessToken) {
      toast.error(t("commentForm.toasts.mustBeLoggedIn"));
      return;
    }

    if (formError) {
      toast.error(t("commentForm.toasts.empty"));
      return;
    }

    const moderation = moderateFields(
    { comment: body},
    terms
    );

    if (moderation.blocked) {
      toast.error(t("validation.blockedComment"));
      return;
    }

    try {
      setLoading(true);

      const res = await safeRequest(
        addComment,
        accessToken,
        setAccessToken,
        postId,
        trimmedBody
      );

      if (res.statusCode !== 201) {
        throw new Error(res.message ?? t("commentForm.toasts.requestFailed"));
      }

      onCommentAdded(res.data);
      setBody("");

      toast.success(t("commentForm.toasts.published"));
    } catch (err: any) {
      toastApiError(err, t("commentForm.toasts.failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitComment();
  };

  const handleKeyDown = useSubmitOnEnter(() => {
    void submitComment();
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col gap-2 rounded-2xl text-[var(--text1)] text-xl"
    >
      <div className="relative">
        <textarea
          value={body}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS.BODY) {
              setBody(e.target.value);
            }
          }}
          placeholder={t("commentForm.placeholder")}
          onKeyDown={handleKeyDown}
          className="rounded-2xl p-3 w-full bg-[var(--bg)] mb-3 text-sm md:text-lg/6"
          aria-label={t("commentForm.placeholder")}
        />

        <span className="absolute bottom-5 right-5 opacity-80 text-xs text-[var(--text1)]">
          {getCharactersLeft(body, MAX_CHARS.BODY)}
        </span>
      </div>

      <button
        title={t("commentForm.aria.submitTitle")}
        type="submit"
        disabled={loading}
        className="ml-auto text-sm md:text-md xl:text-lg flex rounded-full px-4 py-1 bg-transparent border-1 border-[var(--text2)]/20 text-[var(--text2)] hover:bg-[var(--primary-shade)] transition-colors duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? t("commentForm.actions.posting")
          : t("commentForm.actions.addComment")}{" "}
        <IoSend className="text-[var(--button3)] mt-0.5 lg:mt-1 ml-2" />
      </button>
    </form>
  );
};

export default CommentForm;