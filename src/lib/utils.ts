import type { CSSProperties } from "react";

export const formatDate = (date: string) => {
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2].slice(0, 2);
  return `${day}.${month}.${year}`;
};

export const override: CSSProperties = {
  color: "var(--text1)",
};

// 2025-09-20T13:22:01.506Z
