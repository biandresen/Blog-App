import { useState } from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import Avatar from "../atoms/Avatar";
import { CgProfile } from "react-icons/cg";
import { type CommentProps } from "../../types/components.types";
import { useUser } from "../../contexts/UserContext";
import { useAutoResizeTextarea } from "../../hooks/useAutoResizeTextarea";
import { useSubmitOnEnter } from "../../hooks/useSubmitOnEnter";

const Comment = ({
  commentId,
  username,
  authorId,
  avatar,
  date,
  comment,
  onEdit,
  onDelete,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string>(comment);

  const { user } = useUser();

  const { ref: textRef, handleInput } = useAutoResizeTextarea(editedComment, isEditing);

  const isAuthor = authorId?.toString() === user?.id.toString();
  const isAdmin = user?.role.toString() === "ADMIN";

  const handleSubmit = () => {
    if (comment === editedComment) {
      setIsEditing(false);
      return;
    }
    onEdit(commentId, editedComment);
    setIsEditing(false);
  };

  const handleKeyDown = useSubmitOnEnter(handleSubmit);

  return (
    <div className="px-0 xl:px-10 pb-6">
      <div className="text-[var(--text1)]">
        <div className="flex bg-[var(--bg)] w-full px-3 pt-2 xl:w-fit rounded-tl-3xl rounded-tr-3xl">
          {avatar ? <Avatar size={40} avatarUrl={avatar} /> : <CgProfile size={40} />}
          <div className="ml-2">
            <p className="font-bold">{username}</p>
            <p className="text-xs">{date}</p>
          </div>
          <div className="ml-auto xl:ml-3 flex gap-2">
            {isAuthor && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                type="button"
                title="Edit comment"
                className="hover:bg-[var(--primary-tint)] rounded-full px-1"
              >
                <MdEdit size={20} color="text-[var(--button3)]" />
              </button>
            )}
            {(isAuthor || isAdmin) && (
              <button
                onClick={() => onDelete(authorId || 0, commentId)}
                type="button"
                title="Delete comment"
                className="hover:bg-[var(--primary-tint)] rounded-full px-1"
              >
                <MdDelete size={20} color="text-[var(--button3)]" />
              </button>
            )}
          </div>
        </div>
        <div className="flex bg-[var(--bg)] px-4 py-3 rounded-2xl rounded-tr-none xl:rounded-tr-2xl rounded-tl-none w-full relative">
          {isEditing ? (
            <textarea
              ref={textRef}
              aria-label="Edit comment"
              className="w-full h-full text-[var(--text1)] p-1 rounded-l mb-8 text-xl"
              value={editedComment}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setEditedComment(e.target.value);
                handleInput();
              }}
            />
          ) : (
            <p className="text-wrap text-sm md:text-lg/6 whitespace-break-spaces">{comment}</p>
          )}
          {isEditing && (
            <button
              type="button"
              aria-label="Edit Message"
              className="absolute bottom-1 right-2 p-2 rounded-full hover:bg-[var(--primary)] text-[var(--button3)]"
              onClick={() => {
                if (comment === editedComment) {
                  setIsEditing(false);
                  return;
                }
                onEdit(commentId, editedComment);
                setIsEditing(false);
              }}
            >
              <IoSend size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
