import { useState } from "react";
import Button from "../../components/atoms/Button";
import { type CommentFormProps } from "../../types/components.types";
import { toast } from "react-toastify";
import { addComment } from "../../lib/axios";
import { useAuth } from "../../contexts/AuthContext";

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const { accessToken } = useAuth();
  const formError = body.trim() === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      toast.error("You must be logged in to publish a post.");
      return;
    }
    if (formError) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const res = await addComment(accessToken, postId, body);
      console.log(res);
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
      }
      console.error("Failed to publish post", err);
      toast.error(err.message || "Failed to publish comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col gap-2 rounded-2xl text-[var(--text1)] text-xl"
    >
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a comment..."
        className="rounded-2xl p-3 w-full bg-[var(--bg)] mb-3"
      />
      <Button variant="tertiary" label="Post comment" type="submit" disabled={loading}>
        {loading ? "Posting..." : "Add Comment"}
      </Button>
    </form>
  );
};

export default CommentForm;
