import { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoSend } from "react-icons/io5";

import { type CommentProps } from "../../types/components.types";
import { useUser } from "../../contexts/UserContext";

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
  const textRef = useRef(null);

  const { user } = useUser();

  const isAuthor = authorId?.toString() === user?.id.toString();
  const isAdmin = user?.role.toString() === "ADMIN";

  const handleEditInput = (input: string) => {
    if (!textRef.current) return;
    const el = textRef.current as HTMLTextAreaElement;
    el.style.height = "auto"; // reset
    el.style.height = `${el.scrollHeight}px`; // grow
    setEditedComment(input);
  };

  return (
    <div className="px-0 xl:px-10 pb-6">
      <div className="text-[var(--text1)]">
        <div className="flex bg-[var(--bg)] w-full px-3 pt-2 xl:w-fit rounded-tl-3xl rounded-tr-3xl">
          <CgProfile size={40} />
          <div className="ml-1">
            <p className="font-bold">{username}</p>
            <p className="text-xs">{date}</p>
          </div>
          <div className="ml-auto xl:ml-3 flex gap-2">
            {isAuthor && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                type="button"
                title="Edit comment"
                className="hover:bg-[var(--primary)] rounded-full px-1"
              >
                <MdEdit size={20} color="var(--button3)" />
              </button>
            )}
            {(isAuthor || isAdmin) && (
              <button
                onClick={() => onDelete(authorId || 0, commentId)}
                type="button"
                title="Delete comment"
                className="hover:bg-[var(--primary)] rounded-full px-1"
              >
                <MdDelete size={20} color="var(--button3)" />
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
              onChange={(e) => handleEditInput(e.target.value)}
            />
          ) : (
            <p className="text-wrap text-xs md:text-lg/6">{comment}</p>
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
