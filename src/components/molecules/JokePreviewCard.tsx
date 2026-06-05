import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "../../contexts/LanguageContext";

type JokePreviewCardProps = {
  id: number;
  title?: string | null;
  likes?: number;
  to?: string;
  onNavigate?: () => void;
};

const JokePreviewCard = ({ id, title, likes, to, onNavigate }: JokePreviewCardProps) => {
  const { t } = useLanguage();

  const href = to ?? `/jokes/${id}`;
  const displayTitle = title?.trim() || t("drafts.untitled");

  return (
    <Link
      to={href}
      onClick={onNavigate}
      aria-label={`${t("jokeCard.open")}: ${displayTitle}`}
      className="
        group block w-full rounded-xl bg-[var(--primary)] p-3 shadow-sm
        transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105
        focus:outline-none focus:ring-2 focus:ring-[var(--button3)]/50
        cursor-pointer
      "
    >
      <div className="flex items-center justify-between">
        {typeof likes === "number" ?
          <div className="flex items-center gap-1 text-[var(--button3)]">
            <AiFillLike className="text-sm" />
            <span className="text-xs font-semibold">{likes}</span>
          </div>
        : <div />}

        <FiArrowUpRight
          className="
            text-sm text-[var(--text2)] opacity-60
            transition-all duration-150
            group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5
          "
        />
      </div>

      <h3
        className="
          mt-2 text-sm font-semibold text-[var(--text2)]
          [overflow-wrap:anywhere] line-clamp-2
        "
      >
        {displayTitle}
      </h3>
    </Link>
  );
};

export default JokePreviewCard;
