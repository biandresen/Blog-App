import { useState } from "react";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";

import { type CommentFormProps } from "../../types/components.types";
import { addComment } from "../../lib/axios";
import { useAuth } from "../../contexts/AuthContext";
import { safeRequest } from "../../lib/auth";
import { useSubmitOnEnter } from "../../hooks/useSubmitOnEnter";

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const { accessToken, setAccessToken } = useAuth();
  const formError = body.trim() === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken) {
      toast.error("You must be logged in to publish a comment.");
      return;
    }
    if (formError) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const res = await safeRequest(addComment, accessToken, setAccessToken, postId, body);

      if (res.statusCode !== 201) {
        toast.error(res.message);
        throw new Error("Request failed");
      }

      toast.success("Comment published!");
      console.log("Comment published successfully:", res.data);

      onCommentAdded(res.data);
      setBody("");
    } catch (err: any) {
      if (err.message.includes("token")) {
        toast.error("Your session has expired. Please log in again.");
      } else {
        toast.error(err.message || "Failed to publish comment");
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
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a comment..."
        onKeyDown={handleKeyDown}
        className="rounded-2xl p-3 w-full bg-[var(--bg)] mb-3"
      />
      <button
        title="Post comment"
        type="submit"
        disabled={loading}
        className="ml-auto text-sm md:text-md xl:text-lg flex rounded-full px-4 py-1 bg-transparent border-1 border-[var(--text2)] text-[var(--text2)] hover:bg-[var(--primary-shade)] transition-colors duration-100"
      >
        {loading ? "Posting..." : "Add Comment"}{" "}
        <IoSend className="text-[var(--button3)] mt-0.5 lg:mt-1 ml-2" />
      </button>
      {/* <Button variant="tertiary" label="Post comment" type="submit" disabled={loading}>
        {loading ? "Posting..." : "Add Comment"}
      </Button> */}
    </form>
  );
};

export default CommentForm;
