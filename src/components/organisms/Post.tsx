import { useState } from "react";
import { CgProfile } from "react-icons/cg";

import { type CommentType, type PostType } from "../../types/post.types";
import Button from "../../components/atoms/Button";
import Comment from "../molecules/Comment";
import CommentForm from "../molecules/CommentForm";
import { formatDate } from "../../lib/utils";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import { deleteComment, deletePost, editComment, editPost } from "../../lib/axios";
import { toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { usePosts } from "../../contexts/PostsContext";
import { safeRequest } from "../../lib/auth";
import { useAutoResizeTextarea } from "../../hooks/useAutoResizeTextarea";
import { useSubmitOnEnter } from "../../hooks/useSubmitOnEnter";
import Avatar from "../atoms/Avatar";

const Post = ({ post }: { post: PostType }) => {
  const [commentsIsOpen, setCommentsIsOpen] = useState<boolean>(false);
  const [comments, setComments] = useState(post.comments);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);
  const [editedTags, setEditedTags] = useState(post.tags.map((tag) => tag.name).join(", "));
  const [published, setPublished] = useState(post.published);

  const { user } = useUser();
  const { accessToken, setAccessToken } = useAuth();
  const { refreshPosts } = usePosts();

  const isAuthor = post.authorId?.toString() === user?.id.toString();
  const isAdmin = user?.role.toString() === "ADMIN";

  const buttonText = `${commentsIsOpen ? "CLOSE COMMENTS" : "SHOW COMMENTS"}`;

  const { ref: textRef, handleInput } = useAutoResizeTextarea(editedBody, isEditing);

  const handleTitleEnter = useSubmitOnEnter(() =>
    handleEditPost(
      post.id,
      editedTitle,
      editedBody,
      editedTags.split(",").map((t) => t.trim())
    )
  );

  const handleBodyEnter = useSubmitOnEnter(() =>
    handleEditPost(
      post.id,
      editedTitle,
      editedBody,
      editedTags.split(",").map((t) => t.trim())
    )
  );

  const handleTagsEnter = useSubmitOnEnter(() =>
    handleEditPost(
      post.id,
      editedTitle,
      editedBody,
      editedTags.split(",").map((t) => t.trim())
    )
  );

  const handleEditInput = () => {
    setCommentsIsOpen(false);
    setIsEditing(!isEditing);
    setEditedBody(post.body);
    setEditedTitle(post.title);
    setEditedTags(post.tags.map((tag) => tag.name).join(", "));
  };

  const handleEditPost = async (postId: number, newTitle: string, newBody: string, editedTags: string[]) => {
    try {
      if (!accessToken) return;

      const res = await safeRequest(
        editPost,
        accessToken,
        setAccessToken,
        postId,
        newTitle,
        newBody,
        published,
        editedTags
      );

      if (res.statusCode !== 200) throw new Error("Request failed");

      setIsEditing(false);
      await refreshPosts();
      toast.success(`Post edited! ${published ? "Published" : "Unpublished"}`);
    } catch (err: any) {
      toast.error("Failed to edit post");
      console.error("Failed to edit post", err.message);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      if (!accessToken) return;

      const res = await safeRequest(deletePost, accessToken, setAccessToken, postId);
      if (res.statusCode !== 200) throw new Error("Request failed");

      await refreshPosts();
      toast.success("Post deleted!");
    } catch (err: any) {
      toast.error("Failed to delete post");
      console.error("Failed to delete post", err.message);
    }
  };

  const handleEditComment = async (commentId: number, newBody: string) => {
    try {
      if (!accessToken) return;
      if (commentId === null) return;

      const res = await safeRequest(editComment, accessToken, setAccessToken, commentId, newBody);
      if (res.statusCode !== 200) throw new Error("Request failed");

      setComments((prev) =>
        prev.map((comment) => (comment.id === commentId ? { ...comment, body: newBody } : comment))
      );

      toast.success("Comment edited!");
      setIsEditing(false);
    } catch (err: any) {
      toast.error("Failed to edit comment");
      console.error("Failed to edit comment", err.message);
    }
  };

  const handleDeleteComment = async (authorId: number, commentId: number) => {
    try {
      if (!accessToken) return;
      if (authorId === null) return;

      const res = await safeRequest(deleteComment, accessToken, setAccessToken, commentId);
      if (res.statusCode !== 200) throw new Error("Request failed");

      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      toast.success("Comment deleted!");
    } catch (err: any) {
      toast.error("Failed to delete comment");
      console.error("Failed to delete comment", err.message);
    }
  };

  const toggleComments = () => {
    setCommentsIsOpen(!commentsIsOpen);
  };

  const addNewComment = (newComment: CommentType) => {
    // Ensure the new comment has a user object
    const normalizedComment = {
      ...newComment,
      user: newComment.user || { id: user?.id, username: user?.username, avatar: user?.avatar },
    };
    setComments((prev) => [...prev, normalizedComment]);
  };

  return (
    <div
      className={`relative bg-[var(--bg-input)] bg-cover bg-center bg-full text-[var(--text1)] xl:w-[90%] xl:max-w-250 mx-auto rounded-2xl mb-10 ${
        post.published ? "" : "opacity-80"
      }`}
    >
      {post.published ? null : (
        <div className="absolute top-1 left-1 text-[var(--text1)] text-sm rounded-full px-1">DRAFT</div>
      )}
      <div className="ml-auto flex flex-col-reverse absolute top-1 right-1">
        {isAuthor && (
          <button
            onClick={handleEditInput}
            type="button"
            title="Edit post"
            className="hover:bg-[var(--bg)] py-1 rounded-full px-1"
          >
            <MdEdit size={20} color="var(--text3)" />
          </button>
        )}
        {(isAuthor || isAdmin) && (
          <button
            onClick={() => handleDeletePost(post.id)}
            type="button"
            title="Delete post"
            className="hover:bg-[var(--bg)] py-1 rounded-full px-1"
          >
            <MdDelete size={20} color="var(--text3)" />
          </button>
        )}
      </div>
      <div className="flex flex-col-reverse md:flex-row px-5 xl:px-10 pt-6 pb-4">
        {isEditing ? (
          <input
            title="Edit post title"
            type="text"
            value={editedTitle}
            onKeyDown={handleTitleEnter}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full text-xl xl:text-4xl md:text-3xl/8 font-bold mr-5 p-5 border-b"
          />
        ) : (
          <h3 className="text-xl xl:text-4xl md:text-3xl/8 mt-auto">{post.title}</h3>
        )}
        <div className="grid place-items-center mb-5 xl:mb-0 md:ml-auto">
          {post.user.avatar ? <Avatar avatarUrl={post.user.avatar} size={40} /> : <CgProfile size={40} />}
          <p className="font-bold">{post.user.username}</p>
          <p className="text-xs">{formatDate(post.createdAt)}</p>
        </div>
      </div>
      <hr className="text-[var(--text1)] opacity-20" />
      {isEditing ? (
        <textarea
          ref={textRef}
          aria-label="Edit post body"
          title="Edit post body"
          value={editedBody}
          onKeyDown={handleBodyEnter}
          onChange={(e) => {
            setEditedBody(e.target.value);
            handleInput();
          }}
          className="text-sm md:text-xl p-5 border-b w-[90%] ml-10 mt-2 resize-none overflow-hidden"
        />
      ) : (
        <p className="px-5 xl:px-10 py-4 text-sm md:text-xl/7 xl:text-xl whitespace-pre-wrap">{post.body}</p> //whitespace-pre-wrap to preserve line breaks
      )}
      <hr className="text-[var(--text1)] opacity-20" />
      <div className="flex flex-col gap-3 xl:flex-row justify-between items-center px-5 xl:px-10 py-5">
        {isEditing ? (
          <input
            type="text"
            aria-label="Edit post tags"
            title="Edit post tags"
            value={editedTags}
            onKeyDown={handleTagsEnter}
            onChange={(e) => setEditedTags(e.target.value)}
            className="w-full text-sm md:text-xl p-3 mb-8 mr-5 border-b"
          />
        ) : (
          <p className="bg-[var(--primary)] text-[var(--text2)] text-xs md:text-xl font-semibold rounded-2xl py-2 px-6 w-full xl:w-auto">
            {post.tags.map((tag) => `#${tag.name.toLocaleLowerCase()} `)}
          </p>
        )}

        {isEditing && (
          <div className="flex items-center absolute bottom-3.5 right-15">
            <label htmlFor="publish/unpublish" className="mr-2">
              <b>Publish</b>
            </label>
            <input
              className="w-4 h-4 cursor-pointer accent-[var(--primary)]"
              onChange={() => setPublished((prev) => !prev)}
              id="publish/unpublish"
              aria-label="Publish/Unpublish"
              type="checkbox"
              checked={published}
            />
          </div>
        )}

        {isEditing ? (
          <button
            type="button"
            aria-label="Edit Message"
            className="absolute bottom-2 right-2 p-2 rounded-full hover:bg-[var(--primary)] text-[var(--button3)]"
            onClick={() => {
              handleEditPost(
                post.id,
                editedTitle,
                editedBody,
                editedTags.split(",").map((tag) => tag.trim())
              );
            }}
          >
            <IoSend size={20} />
          </button>
        ) : (
          <Button
            className="w-full xl:w-auto xl:min-w-[180px]"
            onClick={toggleComments}
            size="sm"
            variant="tertiary"
            title="Toggle comments"
            label={buttonText}
          >
            {buttonText}
          </Button>
        )}
      </div>
      {commentsIsOpen && (
        <div className="bg-[var(--primary)] text-[var(--text2)] p-6 rounded-b-2xl">
          <h3 className="text-2xl mb-4">Comments</h3>
          {comments.length === 0 && <p>No comments yet. Be the first to comment!</p>}
          {comments.length > 0 &&
            comments.map((comment) => (
              <Comment
                key={comment.id}
                commentId={comment.id}
                username={comment.user?.username || "Unknown"}
                authorId={comment.user?.id || null}
                avatar={comment.user?.avatar || null}
                date={formatDate(comment.createdAt)}
                comment={comment.body}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
              />
            ))}
          <CommentForm postId={post.id} onCommentAdded={addNewComment} />
        </div>
      )}
    </div>
  );
};

export default Post;
