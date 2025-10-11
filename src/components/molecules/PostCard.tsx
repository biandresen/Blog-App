import Button from "../atoms/Button";
import { Link } from "react-router-dom";

import { type PostCardProps } from "../../types/components.types";

const PostCard = ({ id, title }: PostCardProps) => {
  const buttonText = "OPEN";

  const handleOpenDraft = () => {
    console.log("Draft opened");
  };

  return (
    <div className="bg-[var(--primary)] p-4 rounded-2xl shadow-md w-45 h-45 lg:w-50 flex flex-col justify-self-center">
      <h3 className="text-xl font-bold">{id + ". " + title}</h3>
      <Link to={`/posts/${id}`} className="w-full mt-auto">
        <Button onClick={handleOpenDraft} variant="secondary" label={buttonText} className="w-full mt-auto">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default PostCard;
