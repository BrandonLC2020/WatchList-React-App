import { ApiResponse } from '@/constants/types';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') ?? 'http://localhost:5000';

const getApiUrl = (path: string) => `${API_BASE_URL}${path}`;

export const requestApi = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(getApiUrl(path), options);
  const body = (await response.json()) as ApiResponse<T> | null;

  if (!response.ok) {
    throw new Error(body?.error ?? `Request failed (${response.status})`);
  }

  if (!body?.success) {
    throw new Error(body?.error ?? 'Request failed.');
  }

  return body.data as T;
};
