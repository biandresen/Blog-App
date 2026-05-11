export const usernameValidator = (input: string): string => {
  const value = (input ?? "").trim();

  if (value.length < 3 || value.length > 16) {
    return "validation.username.length";
  }

  return "";
};

const emailNumOfCharLower = 5;
const emailNumOfCharUpper = 50;

export const emailValidator = (input: string): string => {
  const value = (input ?? "").trim();

  if (value.length < emailNumOfCharLower || value.length > emailNumOfCharUpper) {
    return "validation.email.length";
  }

  // Require at least one dot after the @ and a final TLD of 2+ letters
  const regEx =
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

  if (!regEx.test(value)) {
    return "validation.email.invalid";
  }

  return "";
};

export const passwordValidator = (input: string): string[] => {
  const value = (input ?? "").trim();
  const errors: string[] = [];

  if (value.length === 0) return [];

  if (value.length < 8) errors.push("validation.password.length");

  const regExLowercase = /[a-z]/;
  const regExUppercase = /[A-Z]/;
  const regExNumber = /[0-9]/;
  const regExSymbol = /[^a-zA-Z0-9\s]/;

  if (!regExLowercase.test(value)) errors.push("validation.password.lowercase");
  if (!regExUppercase.test(value)) errors.push("validation.password.uppercase");
  if (!regExNumber.test(value)) errors.push("validation.password.number");
  if (!regExSymbol.test(value)) errors.push("validation.password.symbol");

  return errors;
};

export const userInputValidator = (input: string): string => {
  const value = (input ?? "").trim();

  if (!value) {
    return "validation.userInput.required";
  }

  return "";
};

export const loginPasswordValidator = (input: string): string => {
  const value = (input ?? "").trim();

  if (!value) {
    return "validation.loginPassword.required";
  }

  return "";
};