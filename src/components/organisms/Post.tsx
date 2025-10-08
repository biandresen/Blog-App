import { useState } from "react";
import { CgProfile } from "react-icons/cg";

import { type CommentType, type PostType } from "../../types/post.types";
import Button from "../../components/atoms/Button";
import Comment from "../molecules/Comment";
import { formatDate } from "../../lib/utils";
import CommentForm from "../molecules/CommentForm";

const Post = ({ post }: { post: PostType }) => {
  const [commentsIsOpen, setCommentsIsOpen] = useState<boolean>(false);
  const [comments, setComments] = useState(post.comments);

  const buttonText = `${commentsIsOpen ? "CLOSE COMMENTS" : "SHOW COMMENTS"}`;

  const toggleComments = () => {
    setCommentsIsOpen(!commentsIsOpen);
  };

  const addNewComment = (newComment: CommentType) => {
    // Ensure the new comment has a user object
    console.log("new comment", newComment);
    const normalizedComment = {
      ...newComment,
      user: newComment.user || { username: "You", avatar: null },
    };
    console.log("normalized comment", normalizedComment);
    setComments((prev) => [...prev, normalizedComment]);
  };

  return (
    <div className="bg-[var(--bg-input)] text-[var(--text1)] xl:w-[90%] xl:max-w-250 mx-auto rounded-2xl mb-10">
      <div className="flex flex-col-reverse md:flex-row px-5 xl:px-10 pt-6 pb-4">
        <h3 className="text-xl xl:text-4xl md:text-3xl/8">{post.title}</h3>
        <div className="grid place-items-center mb-5 xl:mb-0 md:ml-auto">
          <CgProfile size={40} />
          <p className="font-bold">{post.user.username}</p>
          <p className="text-xs">{formatDate(post.createdAt)}</p>
        </div>
      </div>
      <hr className="text-[var(--text1)] opacity-20" />
      <p className="px-5 xl:px-10 py-4 text-sm md:text-xl/7 xl:text-xl">{post.body}</p>
      <hr className="text-[var(--text1)] opacity-20" />
      <div className="flex flex-col gap-3 xl:flex-row justify-between items-center px-5 xl:px-10 py-5">
        <p className="bg-[var(--primary)] text-[var(--text2)] text-xs md:text-lg xl:text-xl font-semibold rounded-2xl py-3 px-6 w-full xl:w-auto">
          {post.tags.map((tag) => `#${tag.name.toLocaleLowerCase()} `)}
        </p>
        <Button className="w-full xl:w-auto" onClick={toggleComments} variant="tertiary" label={buttonText}>
          {buttonText}
        </Button>
      </div>
      {commentsIsOpen && (
        <div className="bg-[var(--primary)] text-[var(--text2)] p-6 rounded-b-2xl">
          <h3 className="text-2xl mb-4">Comments</h3>
          {comments.length === 0 && <p>No comments yet. Be the first to comment!</p>}
          {comments.length > 0 &&
            comments.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.user?.username || "Unknown"}
                avatar={comment.user?.avatar || null}
                date={formatDate(comment.createdAt)}
                comment={comment.body}
              />
            ))}
          <CommentForm postId={post.id} onCommentAdded={addNewComment} />
        </div>
      )}
    </div>
  );
};

export default Post;
