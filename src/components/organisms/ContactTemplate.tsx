import { useMemo } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "../../contexts/LanguageContext";

const EMAIL = "dadjokes@andresensolutions.no";

type Topic = "BUG" | "FEATURE" | "SUGGESTION" | "FEEDBACK";

const getClientInfo = () => {
  const ua = navigator.userAgent;
  const platform = navigator.platform || "";

  const os =
    /Win/.test(platform) ? "Windows" :
    /Mac/.test(platform) ? "macOS" :
    /Linux/.test(platform) ? "Linux" :
    /Android/.test(ua) ? "Android" :
    /iPhone|iPad|iPod/.test(ua) ? "iOS" :
    "Unknown OS";

  const browser =
    /Edg\//.test(ua) ? "Edge" :
    /Chrome\//.test(ua) && !/Edg\//.test(ua) ? "Chrome" :
    /Safari\//.test(ua) && !/Chrome\//.test(ua) ? "Safari" :
    /Firefox\//.test(ua) ? "Firefox" :
    "Unknown Browser";

  return { os, browser, ua };
};

const buildMailto = (email: string, subject: string, body?: string) => {
  const s = encodeURIComponent(subject);
  const b = body ? encodeURIComponent(body) : "";
  return `mailto:${email}?subject=${s}${body ? `&body=${b}` : ""}`;
};

const copySupportEmail = async (email: string, subject: string, body: string) => {
  const text = `To: ${email}\nSubject: ${subject}\n\n${body}`;
  await navigator.clipboard.writeText(text);
};

export default function ContactTemplate() {
  const { t, tf } = useLanguage();

  const topics = useMemo(
    () => [
      { topic: "BUG" as const },
      { topic: "FEATURE" as const },
      { topic: "SUGGESTION" as const },
      { topic: "FEEDBACK" as const },
    ],
    []
  );

  const buildSubject = (topic: Topic) => {
    return t(`contactTemplate.subjects.${topic}`);
  };

  const buildBody = (topic: Topic) => {
    const { os, browser } = getClientInfo();
    const device = `${os} - ${browser}`;

    return tf(`contactTemplate.bodies.${topic}`, {
      device,
    });
  };

  return (
    <section className="mt-4 rounded-xl border border-[var(--text1)]/10 bg-[var(--button1)] p-4">
      <p className="text-sm font-semibold text-[var(--text2)]">
        {t("contactTemplate.heading")}
      </p>

      <div className="mt-3 flex flex-col gap-2">
        {topics.map(({ topic }) => {
          const label = t(`contactTemplate.topics.${topic}`);
          const subject = buildSubject(topic);
          const body = buildBody(topic);

          return (
            <div key={topic} className="flex items-center gap-2">
              <a
                href={buildMailto(EMAIL, subject, body)}
                className="rounded-full bg-[var(--button3)] px-3 py-1 text-sm text-[var(--text0)] hover:brightness-110"
                title={`${label}: ${subject}`}
              >
                {label}
              </a>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await copySupportEmail(EMAIL, subject, body);
                    toast.success(
                      tf("contactTemplate.copySuccess", { label })
                    );
                  } catch {
                    toast.error(t("contactTemplate.copyError"));
                  }
                }}
                className="text-xs underline hover:brightness-110"
                title={t("contactTemplate.copy")}
              >
                {t("contactTemplate.copy")}
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs opacity-80 text-[var(--text2)]">
        {t("contactTemplate.fallbackInfo")}
      </p>
    </section>
  );
}