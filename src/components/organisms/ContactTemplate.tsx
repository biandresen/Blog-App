import { useMemo, useState } from "react";
import Button from "../atoms/Button";
import Modal from "../molecules/Modal";
import { toast } from "react-toastify";

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

const buildSubject = (topic: Topic) => `[DADJOKES][${topic}]`;

const buildBody = (topic: Topic) => {
  const { os, browser } = getClientInfo();
  const baseMeta = `Device / Browser: ${os} - ${browser}\nPage URL:\n`;

  switch (topic) {
    case "BUG":
      return `Describe the issue:

Steps to reproduce:
1.
2.
3.

Expected result:
Actual result:
Screenshots (if applicable):

${baseMeta}`;
    case "FEATURE":
      return `What feature would you like to see?

Why is it valuable?

Any examples/links?

${baseMeta}`;
    case "SUGGESTION":
      return `Your suggestion:

What problem does it solve?

Any extra context?

${baseMeta}`;
    case "FEEDBACK":
      return `Your feedback:

What did you like?

What could be improved?

${baseMeta}`;
    default:
      return `${baseMeta}`;
  }
};

const buildMailto = (email: string, subject: string, body?: string) => {
  // Use encodeURIComponent to avoid "+" showing up in some clients (Thunderbird)
  const s = encodeURIComponent(subject);
  const b = body ? encodeURIComponent(body) : "";
  return `mailto:${email}?subject=${s}${body ? `&body=${b}` : ""}`;
};

const copySupportEmail = async (email: string, subject: string, body: string) => {
  const text = `To: ${email}\nSubject: ${subject}\n\n${body}`;
  await navigator.clipboard.writeText(text);
};

export default function ContactTemplate() {

  const topics = useMemo(
    () => [
      { label: "Bug", topic: "BUG" as const },
      { label: "Feature request", topic: "FEATURE" as const },
      { label: "Suggestion", topic: "SUGGESTION" as const },
      { label: "General feedback", topic: "FEEDBACK" as const },
    ],
    []
  );

  return (
    <section className="mt-4 rounded-xl border border-[var(--text1)]/10 bg-[var(--button1)] p-4">
      <p className="text-sm font-semibold text-[var(--text2)]">
        Choose a topic (prefills subject + message):
      </p>

      <div className="mt-3 flex flex-col gap-2">
        {topics.map(({ label, topic }) => {
          const subject = buildSubject(topic);
          const body = buildBody(topic);

          return (
            <div key={topic} className="flex items-center gap-2">
              <a
                href={buildMailto(EMAIL, subject, body)}
                className="rounded-full bg-[var(--button3)] px-3 py-1 text-sm text-[var(--text0)] hover:brightness-110"
                title={`Email with subject: ${subject}`}
              >
                {label}
              </a>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await copySupportEmail(EMAIL, subject, body);
                    toast.success(`Copied ${label} template`);
                  } catch {
                    toast.error("Copy failed (clipboard permission blocked)");
                  }
                }}
                className="text-xs underline hover:brightness-110"
                title="Copy email + template to clipboard"
              >
                Copy
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs opacity-80 text-[var(--text2)]">
        If the email button doesn’t open anything, use “Copy” and paste into any email app.
      </p>
    </section>
  );
}
