import { CgProfile } from "react-icons/cg";
import { MdDelete, MdEdit } from "react-icons/md";

interface CommentProps {
  username: string;
  date: string;
  comment: string;
}

const Comment = ({ username, date, comment }: CommentProps) => {
  return (
    <div className="px-0 xl:px-10 pb-10">
      <div className="text-[var(--text1)]">
        <div className="flex bg-[var(--bg)] w-full px-3 pt-2 xl:w-fit rounded-tl-3xl rounded-tr-3xl">
          <CgProfile size={40} />
          <div className="ml-1">
            <p className="font-bold">{username}</p>
            <p className="text-xs">{date}</p>
          </div>
          {/* //TODO Only show for admins and comment author */}
          <div className="ml-auto xl:ml-3 flex gap-2">
            <button
              type="button"
              title="edit button"
              className="text-[var(--primary)] hover:bg-[var(--text2)] rounded-full px-1"
            >
              <MdEdit size={20} />
            </button>
            <button
              type="button"
              title="delete button"
              className="text-[var(--primary)] hover:bg-[var(--text2)] rounded-full px-1"
            >
              <MdDelete size={20} />
            </button>
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
