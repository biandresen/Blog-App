import Button from "../atoms/Button";
import { Link } from "react-router-dom";

import { type PostCardProps } from "../../types/components.types";

const PostCard = ({ id, title }: PostCardProps) => {
  const buttonText = "OPEN";

  return (
    <div className="bg-[var(--primary)] p-4 rounded-2xl shadow-md w-45 h-45 lg:w-50 flex flex-col justify-self-center">
      <h3 className="text-xl font-bold">{title}</h3>
      <Link to={`/posts/${id}`} className="w-full mt-auto">
        <Button variant="secondary" label={buttonText} className="w-full mt-auto">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default PostCard;
