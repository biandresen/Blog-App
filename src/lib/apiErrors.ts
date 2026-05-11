import { toast } from "react-toastify";

export type AppApiError = Error & {
  status?: number;
  statusCode?: number;
  retryAfter?: number;
  code?: string;
  isNetworkError?: boolean;
  response?: {
    status?: number;
    data?: {
      status?: string;
      statusCode?: number;
      message?: string;
      retryAfter?: number;
      errors?: unknown;
    };
    headers?: Record<string, string>;
  };
};

export function getApiErrorMessage(err: any, fallback = "Something went wrong") {
  const status =
    err?.status ??
    err?.statusCode ??
    err?.response?.status ??
    err?.response?.data?.statusCode;

  const retryAfter =
    err?.retryAfter ??
    err?.response?.data?.retryAfter ??
    err?.response?.headers?.["retry-after"];

  const message =
    err?.response?.data?.message ??
    err?.message;

  if (status === 429) {
    const retrySeconds = Number(retryAfter);
    if (!Number.isNaN(retrySeconds) && retrySeconds > 0) {
      return `Too many requests. Try again in ${retrySeconds} seconds.`;
    }
    return message || "Too many requests. Please wait a moment and try again.";
  }

  if (status === 401 || err?.code === "SESSION_EXPIRED") {
    return message || "Your session has expired. Please log in again.";
  }

  if (err?.isNetworkError) {
    return "Network error. Check your connection and try again.";
  }

  return message || fallback;
}

export function toastApiError(err: any, fallback = "Something went wrong") {
  toast.error(getApiErrorMessage(err, fallback));
}