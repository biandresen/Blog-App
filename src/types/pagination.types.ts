export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PaginatedResponse<T> = {
  status: string;
  statusCode: number;
  message: string;
  data: T[];
  count: number; // items in this page
  meta: PageMeta;
};