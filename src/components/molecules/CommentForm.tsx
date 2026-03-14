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

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const { accessToken, setAccessToken } = useAuth();
  const { t } = useLanguage();

  const formError = body.trim() === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken) {
      toast.error(t("commentForm.toasts.mustBeLoggedIn"));
      return;
    }

    if (formError) {
      toast.error(t("commentForm.toasts.empty"));
      return;
    }

    try {
      setLoading(true);

      const res = await safeRequest(addComment, accessToken, setAccessToken, postId, body);

      if (res.statusCode !== 201) {
        toast.error(res.message ?? t("commentForm.toasts.requestFailed"));
        throw new Error(t("commentForm.toasts.requestFailed"));
      }

      toast.success(t("commentForm.toasts.published"));

      onCommentAdded(res.data);
      setBody("");
    } catch (err: any) {
      if (err?.message?.includes("token")) {
        toast.error(t("commentForm.toasts.sessionExpired"));
      } else {
        toast.error(err?.message || t("commentForm.toasts.failed"));
      }

      console.error("Failed to publish comment:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = useSubmitOnEnter(() => handleSubmit(new Event("submit") as any));

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col gap-2 rounded-2xl text-[var(--text1)] text-xl"
    >
      <div className="relative">
        <textarea
          value={body}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS.BODY) setBody(e.target.value);
          }}
          placeholder={t("commentForm.placeholder")}
          onKeyDown={handleKeyDown}
          className="rounded-2xl p-3 w-full bg-[var(--bg)] mb-3 text-sm md:text-lg/6"
        />
        <span className="absolute bottom-5 right-5 opacity-80 text-xs text-[var(--text1)]">
          {getCharactersLeft(body, MAX_CHARS.BODY)}
        </span>
      </div>

      <button
        title={t("commentForm.aria.submitTitle")}
        type="submit"
        disabled={loading}
        className="ml-auto text-sm md:text-md xl:text-lg flex rounded-full px-4 py-1 bg-transparent border-1 border-[var(--text2)]/20 text-[var(--text2)] hover:bg-[var(--primary-shade)] transition-colors duration-100"
      >
        {loading ? t("commentForm.actions.posting") : t("commentForm.actions.addComment")}{" "}
        <IoSend className="text-[var(--button3)] mt-0.5 lg:mt-1 ml-2" />
      </button>
    </form>
  );
};

export default CommentForm;