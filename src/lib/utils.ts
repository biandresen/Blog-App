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
