import { linkifyText } from "../../lib/utils";

type LinkifiedTextProps = {
  text: string;
  className?: string;
};

const LinkifiedText = ({ text, className }: LinkifiedTextProps) => {
  const parts = linkifyText(text, {
    linkifyBareDomains: true,
    linkifyEmails: true,
  });

  return (
    <p className={`whitespace-pre-wrap ${className ?? ""}`}>
      {parts.map((p, i) =>
        p.type === "text" ? (
          <span key={i}>{p.value}</span>
        ) : (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline break-words"
            title="Open link in new tab"
          >
            {p.value}
          </a>
        )
      )}
    </p>
  );
};

export default LinkifiedText;
