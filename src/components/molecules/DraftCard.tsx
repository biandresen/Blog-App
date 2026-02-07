import { Link } from "react-router-dom";
import Button from "../atoms/Button";

interface DraftCardProps {
  id: number;
  draftTitle: string;
}

const DraftCard = ({ id, draftTitle }: DraftCardProps) => {
  const buttonText = "OPEN";

  return (
    <div className="bg-[var(--primary)] p-4 rounded-2xl shadow-md w-55 h-55 flex flex-col justify-self-center">
      <h3 className="text-2xl font-bold overflow-y-hidden [overflow-wrap:anywhere]">{draftTitle}</h3>
      <Link to={`/posts/${id}`} className="w-full mt-auto">
        <Button variant="secondary" className="w-full mt-auto mb-3" label={buttonText}>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default DraftCard;
