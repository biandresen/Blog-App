import Button from "../atoms/Button";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";

import { type PostCardProps } from "../../types/components.types";

const PostCard = ({ id, title, likes }: PostCardProps) => {
  const buttonText = "OPEN";

  return (
    <div className="bg-[var(--primary)] p-4 rounded-2xl shadow-md w-45 h-45 lg:w-50 flex flex-col justify-self-center">
      {likes !== undefined && (
        <div className="text-[var(--button3)]">
          <AiFillLike className="inline text-lg" />
          <span className="ml-1 font-bold">{likes}</span>
        </div>
      )}
      <h3 className="text-xl font-bold overflow-y-hidden [overflow-wrap:anywhere]">{title}</h3>
      <Link to={`/jokes/${id}`} className="w-full mt-auto">
        <Button variant="secondary" size="sm" label={buttonText} className="w-full mt-auto">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default PostCard;
