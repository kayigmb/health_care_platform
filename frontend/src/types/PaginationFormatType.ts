export interface PaginationFormatType<T> {
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
  data: T[];
}
