import { CgProfile } from "react-icons/cg";
import { MdDelete, MdEdit } from "react-icons/md";

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
  const { user } = useUser();

  const isAuthor = authorId?.toString() === user?.id.toString();
  const isAdmin = user?.role.toString() === "ADMIN";

  const handleOpenComment = () => {
    const newComment = prompt("Edit your comment:", comment);
    if (newComment !== null && newComment.trim() !== "" && newComment !== comment) {
      onEdit(commentId, newComment);
    }
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
                onClick={handleOpenComment}
                type="button"
                title="edit button"
                className="text-[var(--primary)] hover:bg-[var(--primary)] rounded-full px-1"
              >
                <MdEdit size={20} color="var(--button3)" />
              </button>
            )}
            {(isAuthor || isAdmin) && (
              <button
                onClick={() => onDelete(authorId || 0, commentId)}
                type="button"
                title="delete button"
                className="text-[var(--primary)] hover:bg-[var(--primary)] rounded-full px-1"
              >
                <MdDelete size={20} color="var(--button3)" />
              </button>
            )}
          </div>
        </div>
        <div className="flex bg-[var(--bg)] px-4 py-3 rounded-2xl rounded-tr-none xl:rounded-tr-2xl rounded-tl-none w-full relative">
          <p className="text-wrap text-xs md:text-lg/6">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
