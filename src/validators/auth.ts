export const usernameValidator = (input: string) => {
  if (input.trim().length < 3 || input.length > 16) return "Username must be between 3 and 16 characters";
  return "";
};

// Helper that returns an error message (or empty string if valid)
export const emailValidator = (input: string): string => {
  const value = (input ?? "").trim();
  if (value.length < 5 || value.length > 32) return "Email must be between 5-32 characters";

  // Require at least one dot after the @ and a final TLD of 2+ letters
  const regEx = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

  if (!regEx.test(value)) {
    return "Please enter a valid email address (name@domain.com)";
  }
  return "";
};

export const passwordValidator = (input: string): string[] => {
  const value = (input ?? "").trim();
  const errors: string[] = [];

  if (value.length === 0) return [];

  if (value.length < 8) errors.push("Password must be at least 8 characters long");

  const regExLowercase = /[a-z]/;
  const regExUppercase = /[A-Z]/;
  const regExNumber = /[0-9]/;
  const regExSymbol = /[^a-zA-Z0-9\s]/;

  if (!regExLowercase.test(value)) errors.push("Password must contain a lowercase letter");
  if (!regExUppercase.test(value)) errors.push("Password must contain an uppercase letter");
  if (!regExNumber.test(value)) errors.push("Password must contain a number");
  if (!regExSymbol.test(value)) errors.push("Password must contain a symbol");

  return errors;
};

export const userInputValidator = (input: string) => {
  const value = (input ?? "").trim();
  if (value.length < 3 || value.length > 32) return "Must be a valid username or email";

  return "";
};

export const loginPasswordValidator = (input: string) => {
  const value = (input ?? "").trim();
  if (value.length < 8) return "Password must be at least 8 characters long";

  return "";
};
