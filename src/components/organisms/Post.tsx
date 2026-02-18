import { useEffect, useState, useRef } from "react";

import { type CommentType, type PostType } from "../../types/post.types";
import Button from "../../components/atoms/Button";
import Comment from "../molecules/Comment";
import CommentForm from "../molecules/CommentForm";
import { capitalizeFirstLetter, formatDate, getCharactersLeft } from "../../lib/utils";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import { deleteComment, deletePost, editComment, editPost, toggleLike } from "../../lib/axios";
import { toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { safeRequest } from "../../lib/auth";
import { useAutoResizeTextarea } from "../../hooks/useAutoResizeTextarea";
import { useSubmitOnEnter } from "../../hooks/useSubmitOnEnter";
// import Avatar from "../atoms/Avatar";
import AvatarWithBadges from "../atoms/AvatarWithBadges";
import { NavLink } from "react-router-dom";
import Modal from "../molecules/Modal";
import { MAX_CHARS } from "../../lib/constants";
import TagsCard from "../molecules/TagsCard";
import type { User } from "../../types/context.types";
// import LinkifiedText from "../atoms/LinkifiedText";

const Post = ({
  post,
  onPostUpdated,
  onPostDeleted
}: {
  post: PostType;
  onPostUpdated?: (updated: PostType) => void;
  onPostDeleted?: (id: number) => void;
}) => {
  const [commentsIsOpen, setCommentsIsOpen] = useState<boolean>(false);
  const [comments, setComments] = useState(post.comments);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);
  const [editedTags, setEditedTags] = useState(post.tags.map((tag) => tag.name).join(", "));
  const [published, setPublished] = useState(post.published);
  const [hasLiked, setHasLiked] = useState(false);
  const [likedList, setLikedList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditMenu, setShowEditMenu] = useState<boolean>(false);
  const [isBodyExpanded, setIsBodyExpanded] = useState(false);

  const { user } = useUser();
  const { accessToken, setAccessToken } = useAuth();
  const { ref: textRef, handleInput } = useAutoResizeTextarea(editedBody, isEditing);

  const inputRef = useRef<HTMLInputElement>(null);

  const isAuthor = user?.id != null && post.authorId === Number(user.id);
  const isAdmin = user?.role === "ADMIN";
  const canEdit = isAuthor || isAdmin;
  const buttonText = `${commentsIsOpen ? "CLOSE COMMENTS" : "SHOW COMMENTS"}`;

  const BODY_PREVIEW_LIMIT = 600;
  const bodyIsLong = post.body.length > BODY_PREVIEW_LIMIT;

  const displayedBody = bodyIsLong && !isBodyExpanded
  ? post.body.slice(0, BODY_PREVIEW_LIMIT) + "..."
  : post.body;

  useEffect(() => {
    // reset when post changes
    setIsBodyExpanded(false);
  }, [post.id]);

  let avatarSize = 63;
  useEffect(() => {
    if (window.innerWidth >= 1280) {
      avatarSize = 63;
    } else if (window.innerWidth >= 768) {
      avatarSize = 50;
    }
  }, [window.innerWidth]);

  useEffect(() => {
    if (!post) return;

    const liked = user ? post.likes.some((like) => like.userId === Number(user.id)) : false;
    setLikedList(post.likes.map((like) => like.user.username));
    setHasLiked(liked);
  }, [post, user]);

  useEffect(() => {
  if (isEditing) {
    inputRef.current?.focus();
  }
}, [isEditing]);


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
    setIsEditing(prev => !prev);
    setEditedBody(post.body);
    setEditedTitle(post.title);
    setEditedTags(post.tags.map((tag) => tag.name).join(", "));
  };

  const handleOpenEditMenu = () => {
    setShowEditMenu(!showEditMenu);
  }

  const handleToggleLike = async () => {
    if (!accessToken || !user) {
      toast.error("You must be logged in to like a joke");
      return;
    };

    if (Number(user.id) == Number(post.authorId)) {
      toast.error("You cannot like your own joke");
      return;
    };

    try {
      const res = await safeRequest(toggleLike, accessToken, setAccessToken, post.id);
      if (res.statusCode === 200 || res.statusCode === 201) {
        setLikedList((prev) => {
          if (hasLiked) {
            return prev.filter((username) => username !== user?.username);
          } else {
            return [...prev, user?.username || "Unknown"];
          }
        });
        setHasLiked((prev) => !prev);
      } else {
        throw new Error();
      }

      // await refreshPosts();
    } catch (err: any) {
      toast.error("Failed to toggle like");
      console.error("Failed to toggle like", err.message);
    }
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

    const updatedPost: PostType = res.data;

    // ✅ Update local Post component state so it re-renders immediately
    setIsEditing(false);
    setEditedTitle(updatedPost.title);
    setEditedBody(updatedPost.body);
    setEditedTags(updatedPost.tags.map((t) => t.name).join(", "));
    setPublished(updatedPost.published);

    // ✅ Tell parent list to patch/remove/whatever it wants
    onPostUpdated?.(updatedPost);

    toast.success(`Post edited! ${updatedPost.published ? "Published" : "Unpublished"}`);
  } catch (err: any) {
    toast.error("Failed to edit joke");
    console.error("Failed to edit joke", err?.response?.data?.errors || err.message);
  }
};


const handleDeletePost = async (postId: number) => {
  try {
    if (!accessToken) return;

    const res = await safeRequest(deletePost, accessToken, setAccessToken, postId);
    if (res.statusCode !== 200) throw new Error("Request failed");

    setShowModal(false);
    toast.success("Joke deleted!");

    // ✅ Tell parent to remove it from its list
    onPostDeleted?.(postId);

    // Optional: only navigate if you're on a page where it makes sense
    // navigate("/jokes");
  } catch (err: any) {
    toast.error("Failed to delete joke");
    console.error("Failed to delete joke", err.message);
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
      className={`relative bg-[var(--bg-input)] bg-cover bg-center bg-full text-[var(--text1)] w-full xl:w-[90%] xl:max-w-250 mx-auto rounded-2xl mb-10`}
    >
      <Modal
        isOpen={showModal}
        title="Delete joke"
        message="Are you sure you want to delete this joke? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => handleDeletePost(post.id)}
        onCancel={() => setShowModal(false)}
      />

      {published ? null : (
        <div className="text-[var(--text1)] absolute top-5 md:top-4.5 right-14 xl:right-19 text-sm md:text-lg">DRAFT</div>
      )}
      <div className="flex absolute gap-2 top-4 right-5 xl:right-10">
        {canEdit && <button
            onClick={handleOpenEditMenu}
            type="button"
            title="Edit joke"
            className="hover:bg-[var(--bg)] py-1 rounded-full px-1"
          >
           <BsThreeDotsVertical size={20} color="var(--text3)" />
          </button>}
        {showEditMenu && (
          <div className="absolute flex top-9 right-0 bg-[var(--bg-input)] border-1 border-[var(--text1)]/20 rounded-full px-1 py-0.5 z-50 opacity-80 ">
        {isAuthor && (
          <button
            onClick={handleEditInput}
            type="button"
            title="Edit joke"
            className="hover:bg-[var(--bg)] py-1 rounded-full px-1"
          >
            <MdEdit size={15} color="var(--text3)" />
          </button>
        )}
        {(isAuthor || isAdmin) && (
          <button
            onClick={() => setShowModal(true)}
            type="button"
            title="Delete joke"
            className="hover:bg-[var(--bg)] py-1 rounded-full px-1"
          >
            <MdDelete size={15} color="var(--text3)" />
          </button>
        )}</div>
      )}
      {!published ? null : (
        <div className="group">
          <button
            aria-label="Like joke"
            title="Like joke"
            type="button"
            onClick={handleToggleLike}
            className="flex cursor-pointer px-2.5 pt-1 min-w-14 rounded-full transition-colors duration-200 bg-transparent border-1 border-[var(--text1)]/20 text-[var(--text3)] hover:bg-[var(--button1)] hover:text-[var(--text2)]! transition-colors duration-100 text-md
            "
            style={{ color: hasLiked ? "var(--button3)" : "var(--text3)" }}
          >
            {hasLiked ? <AiFillLike /> : <AiOutlineLike className="mt-0.5" />}
            <span className="ml-1 font-bold">
              {likedList?.length > 0 ? likedList?.length : hasLiked ? 1 : 0}
            </span>
          </button>

          {likedList?.length > 0 && (
            <div
              className="
              absolute right-0 xl:right-0 top-8 border max-h-300 overflow-y-auto
              w-32 p-2 rounded bg-[var(--bg-input)] shadow-lg text-[var(--text1)]
              opacity-0 pointer-events-none
              group-hover:opacity-100 group-hover:pointer-events-auto
              transition-opacity duration-200
              z-50"
            >
              {likedList.map((username, index) => (
                <div key={index + username} className="text-sm border-b last:border-b-0 py-1">
                  {username}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      </div>

      <div className="flex xl:mb-0 md:ml-auto absolute top-3 left-5 xl:left-10">
        {/* <Avatar avatarUrl={post.user?.avatar} size={65} /> */}
        <AvatarWithBadges
          size={avatarSize}
          avatarUrl={post.user?.avatar}
          username={post.user?.username}
          user={post.user as User}
        />
        <div className="flex flex-col justify-center ml-2 max-w-[calc(20px+30vw)] mt-2">
          <p title="Username" className="font-bold text-[0.8rem]/3.5 md:text-[1rem] [overflow-wrap:anywhere] max-w-[calc(5px+30vw)]">{capitalizeFirstLetter(post.user.username)}</p>
          <p title="Date of post" className="text-[0.7rem] mt-0 opacity-80">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <hr className="text-[var(--text1)] opacity-10 mt-23" />
      <div className="flex flex-col-reverse md:flex-row px-5 xl:px-10 pt-4">
        {isEditing ? (
          <div className="bg-[var(--bg)] rounded-lg p-1 w-full relative">
            <input
              ref={inputRef}
              title="Edit joke title"
              type="text"
              value={editedTitle}
              maxLength={MAX_CHARS.TITLE}
              onKeyDown={handleTitleEnter}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS.TITLE) setEditedTitle(e.target.value);
              }}
              className="w-full text-xl xl:text-3xl md:text-3xl/8 p-4 bg-transparent outline-none"
            />
            <span className="absolute bottom-0.5 right-2 opacity-80 text-xs">{getCharactersLeft(editedTitle, MAX_CHARS.TITLE)}</span>
          </div>
        ) : (
          <NavLink aria-label="Go to joke" to={`/jokes/${post.id}`}>
            <h3 title="Joke title" className="text-xl/5 xl:text-3xl md:text-3xl/8 mt-autom mr-22 [overflow-wrap:anywhere]">{post.title}</h3>
          </NavLink>
        )}
      </div>

      {isEditing ? (
        <div className="mx-5 xl:mx-10 my-4 w-auto bg-[var(--bg)] rounded-lg relative">
          <textarea
            ref={textRef}
            aria-label="Edit joke body"
            title="Edit joke body"
            value={editedBody}
            maxLength={MAX_CHARS.BODY}
            onKeyDown={handleBodyEnter}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS.BODY) setEditedBody(e.target.value);
              handleInput();
            }}
            className="text-sm md:text-lg p-5 resize-none w-full overflow-hidden outline-none"
          />
          <span className="absolute bottom-0.5 right-2 opacity-80 text-xs">{getCharactersLeft(editedBody, MAX_CHARS.BODY)}</span>
        </div>
      ) : (
        <div className="px-5 xl:px-10 pb-4 pt-1">
          <p className="text-sm md:text-lg/7 xl:text-lg whitespace-pre-wrap [overflow-wrap:anywhere] [word-break:break-word]">{displayedBody}</p>
          {/* If I want to add links */}
          {/* <LinkifiedText
            className="text-sm md:text-lg/7 xl:text-lg whitespace-pre-wrap [overflow-wrap:anywhere] [word-break:break-word]"
            text={displayedBody}
          /> */}

          {bodyIsLong && (
            <button
              type="button"
              onClick={() => setIsBodyExpanded((p) => !p)}
              className="mt-2 text-sm md:text-lg opacity-80 hover:opacity-100 underline"
              aria-expanded={isBodyExpanded}
            >
              {isBodyExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}
      <hr className="text-[var(--text1)] opacity-10" />
      <div className="flex flex-col gap-3 xl:flex-row justify-between px-5 xl:px-10 py-4">
        {isEditing ? (
          <div className="mb-8 w-full bg-[var(--bg)] rounded-lg relative">
            <input
            type="text"
            aria-label="Edit joke tags"
            title="Edit joke tags"
            value={editedTags}
            maxLength={MAX_CHARS.TAGS}
            onKeyDown={handleTagsEnter}
            onChange={(e) =>
              { if (e.target.value.length <= MAX_CHARS.TAGS) setEditedTags(e.target.value);}}
            className="w-full text-sm md:text-lg p-5"
            />
            <span className="absolute bottom-0.5 right-2 opacity-80 text-xs">{getCharactersLeft(editedTags, MAX_CHARS.TAGS)}</span>
          </div>
        ) : post.tags[0].name.length >= 1 ? (
          <TagsCard tags={post?.tags} />
        ) : <p className="opacity-0 mb-[-10px]"></p>}

        {isEditing && (
          <div className="flex items-center absolute bottom-3.5 right-15">
            <label htmlFor="publish/unpublish" className="mr-2">
              <b>Publish</b>
            </label>
            <input
              className="w-4 h-4 cursor-pointer accent-[var(--text1)]"
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
            className="w-full xl:w-auto xl:min-w-[180px] max-h-10 mt-auto"
            onClick={toggleComments}
            size="sm"
            variant="outline"
            title="Toggle comments"
            label={buttonText}
          >
            {buttonText}
          </Button>
        )}
      </div>
      {commentsIsOpen && (
        <div className={`bg-[var(--primary)] text-[var(--text2)] p-6 rounded-b-2xl`}>
          <h3 className="text-lg md:text-2xl mb-0">COMMENTS</h3>
          {comments.length === 0 && <p className="text-xs md:text-sm opacity-70">No comments yet.
            {published ? ` Be the first to comment!` : ``} </p>}
          {comments.length > 0 &&
            comments.map((comment) => (
              <Comment
                key={comment.id}
                commentId={comment.id}
                username={comment.user?.username || "Unknown"}
                authorId={Number(comment.user?.id) || null}
                avatar={comment.user?.avatar || null}
                date={formatDate(comment.createdAt)}
                comment={comment.body}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
              />
            ))}
            {user && published ? (<CommentForm postId={post.id} onCommentAdded={addNewComment} />) : (null)}
        </div>
      )}
    </div>
  );
};

export default Post;
