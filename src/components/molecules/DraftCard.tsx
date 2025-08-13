import Button from "../atoms/Button";

interface DraftCardProps {
  id: number;
  draftTitle: string;
}

const DraftCard = ({ id, draftTitle }: DraftCardProps) => {
  const buttonText = "OPEN";

  const handleOpenDraft = () => {
    // Logic to open the draft
    console.log("Draft opened");
  };

  return (
    <div
      data-name="post-card"
      className="bg-[var(--primary)] p-4 rounded-2xl shadow-md w-55 h-55 flex flex-col justify-self-center"
    >
      <h3 className="text-2xl font-bold">{id + ". " + draftTitle}</h3>
      <Button
        onClick={handleOpenDraft}
        variant="secondary"
        className="w-full mt-auto mb-3"
        label={buttonText}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default DraftCard;
