export type NormalizedApiError = Error & {
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
      code?: string;
    };
    headers?: Record<string, string>;
  };
};

export function normalizeApiError(err: any): NormalizedApiError {
  const status =
    err?.response?.status ??
    err?.response?.data?.statusCode ??
    err?.statusCode;

  const retryAfterRaw =
    err?.response?.data?.retryAfter ??
    err?.response?.headers?.["retry-after"];

  const retryAfter =
    retryAfterRaw != null && !Number.isNaN(Number(retryAfterRaw))
      ? Number(retryAfterRaw)
      : undefined;

  const message =
    err?.response?.data?.message ??
    err?.message ??
    "Something went wrong";

  const normalized = new Error(message) as NormalizedApiError;

  normalized.status = status;
  normalized.statusCode = status;
  normalized.retryAfter = retryAfter;
  normalized.code = err?.response?.data?.code ?? err?.code;
  normalized.response = err?.response;
  normalized.isNetworkError = !err?.response && !status;

  return normalized;
}