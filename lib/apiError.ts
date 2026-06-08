import axios from 'axios';

export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) return error.message;
    return 'An unexpected error occurred.';
  }

  const status = error.response?.status;
  const serverMessage = error.response?.data?.error || error.response?.data?.message;

  switch (status) {
    case 401:
      return 'Your session has expired. Please log in again.';
    case 403:
      return serverMessage?.toLowerCase().includes('role')
        ? 'Access denied. Your account does not have the Club Executive role required for this action.'
        : 'Access denied. You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 400:
      return serverMessage || 'Invalid request. Please check your input.';
    case 500:
      return 'A server error occurred. Please try again later.';
    default:
      if (!error.response) return 'Unable to connect to the server. Check your internet connection.';
      return serverMessage || `Request failed (${status}).`;
  }
}
