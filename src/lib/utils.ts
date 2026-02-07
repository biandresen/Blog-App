import type { CSSProperties } from "react";

export const formatDate = (date: string) => {
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2].slice(0, 2);
  return `${day}.${month}.${year}`;
};
// 2025-09-20T13:22:01.506Z

export const override: CSSProperties = {
  color: "var(--text1)",
};

// Errors returned from the API: err.response.data.errors (error.message)
export const setInputErrors = (errors: { message: string }[] | undefined) => {
  const errorList: string[] = [];

  if (errors?.length) {
    for (const error of errors) {
      errorList.push(error.message);
    }
  }

  return errorList.length
    ? errorList
    : ["Failed to save draft. Please try again."];
};

export const getCharactersLeft = (input: string, maxCharacters: number) => {
  return `${input.length} / ${maxCharacters}`
}

export const capitalizeFirstLetter = (string: string) => {
  if (!string) return string; // Handle empty strings
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Convert plain text into render-safe segments where URLs become hyperlinks.
 * Production-ready because it returns structured data (not HTML strings),
 * so you can render without dangerouslySetInnerHTML (prevents XSS).
 */

export type TextPart =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string };

type LinkifyOptions = {
  /**
   * If true, converts "example.com" -> "https://example.com"
   * and "www.example.com" -> "https://www.example.com"
   */
  linkifyBareDomains?: boolean;

  /** Default protocol for bare domains */
  defaultProtocol?: "https://" | "http://";

  /** If true, also linkifies emails */
  linkifyEmails?: boolean;
};

const DEFAULT_OPTS: Required<LinkifyOptions> = {
  linkifyBareDomains: true,
  defaultProtocol: "https://",
  linkifyEmails: false,
};

// Matches:
// - http(s)://...
// - www....
// - bare domains like example.com (optional)
// - keeps punctuation out of the URL (handled by trimming)
function buildUrlRegex(linkifyBareDomains: boolean) {
  const scheme = String.raw`https?:\/\/[^\s<]+`;
  const www = String.raw`www\.[^\s<]+`;
  const bare = String.raw`(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?:\/[^\s<]*)?`;

  // We will later trim trailing punctuation.
  const pattern = linkifyBareDomains
    ? String.raw`(${scheme}|${www}|${bare})`
    : String.raw`(${scheme}|${www})`;

  return new RegExp(pattern, "gi");
}

function buildEmailRegex() {
  // Reasonable email matcher (not perfect by spec, but good for UI)
  return /([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/gi;
}

const TRAILING_PUNCT = /[)\],.!?:;]+$/;

/**
 * Normalize display/target:
 * - strips trailing punctuation from the detected token
 * - adds protocol to www/bare domains
 */
function normalizeUrlToken(
  rawToken: string,
  defaultProtocol: "https://" | "http://"
): { display: string; href: string } {
  const trimmed = rawToken.replace(TRAILING_PUNCT, "");
  // const removed = rawToken.slice(trimmed.length); // trailing punctuation removed
  // display should keep punctuation in the surrounding text, not inside the link
  const display = trimmed;

  let href = trimmed;

  if (/^www\./i.test(href)) href = `${defaultProtocol}${href}`;
  else if (!/^https?:\/\//i.test(href)) href = `${defaultProtocol}${href}`;

  // NOTE: removed punctuation should be handled by caller as text
  // (we return only the normalized link portion here)
  return { display, href };
}

function normalizeEmailToken(rawToken: string) {
  const trimmed = rawToken.replace(TRAILING_PUNCT, "");
  const display = trimmed;
  const href = `mailto:${trimmed}`;
  return { display, href };
}

/**
 * Main function: returns an array of parts you can render safely.
 */
export function linkifyText(input: string, options?: LinkifyOptions): TextPart[] {
  const opts = { ...DEFAULT_OPTS, ...(options ?? {}) };
  if (!input) return [{ type: "text", value: "" }];

  const parts: TextPart[] = [];

  // We do a two-pass approach:
  // 1) find URL-like tokens
  // 2) optionally find emails in remaining text segments
  const urlRegex = buildUrlRegex(opts.linkifyBareDomains);
  let lastIndex = 0;

  const matches = Array.from(input.matchAll(urlRegex));
  for (const m of matches) {
    const raw = m[0];
    const index = m.index ?? 0;

    if (index > lastIndex) {
      parts.push({ type: "text", value: input.slice(lastIndex, index) });
    }

    const { display, href } = normalizeUrlToken(raw, opts.defaultProtocol);

    // Add link part
    parts.push({ type: "link", value: display, href });

    // Add trailing punctuation (if any) as plain text
    const trailing = raw.slice(display.length);
    if (trailing) parts.push({ type: "text", value: trailing });

    lastIndex = index + raw.length;
  }

  if (lastIndex < input.length) {
    parts.push({ type: "text", value: input.slice(lastIndex) });
  }

  if (!opts.linkifyEmails) return mergeAdjacentText(parts);

  // Second pass: linkify emails only inside text parts
  const emailRegex = buildEmailRegex();
  const withEmails: TextPart[] = [];

  for (const part of parts) {
    if (part.type === "link") {
      withEmails.push(part);
      continue;
    }

    const text = part.value;
    let i = 0;
    const emailMatches = Array.from(text.matchAll(emailRegex));

    if (emailMatches.length === 0) {
      withEmails.push(part);
      continue;
    }

    for (const em of emailMatches) {
      const raw = em[0];
      const idx = em.index ?? 0;

      if (idx > i) withEmails.push({ type: "text", value: text.slice(i, idx) });

      const { display, href } = normalizeEmailToken(raw);
      withEmails.push({ type: "link", value: display, href });

      const trailing = raw.slice(display.length);
      if (trailing) withEmails.push({ type: "text", value: trailing });

      i = idx + raw.length;
    }

    if (i < text.length) withEmails.push({ type: "text", value: text.slice(i) });
  }

  return mergeAdjacentText(withEmails);
}

/** Keeps output clean and avoids lots of tiny text fragments */
function mergeAdjacentText(parts: TextPart[]): TextPart[] {
  const out: TextPart[] = [];
  for (const p of parts) {
    const last = out[out.length - 1];
    if (p.type === "text" && last?.type === "text") {
      last.value += p.value;
    } else {
      out.push({ ...p });
    }
  }
  return out;
}
