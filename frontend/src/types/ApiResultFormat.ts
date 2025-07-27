/**
 * This file defines the ApiResultFormat interface used for API responses.
 * It includes a status field to indicate success or error,
 * a message field for additional information,
 * and an optional data field for the response data.
 */
export interface ApiResultFormat<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}
