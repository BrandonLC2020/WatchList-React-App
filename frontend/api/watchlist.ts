import { requestApi } from '@/api/client';
import { CreateWatchListItemRequest, WatchListItem } from '@/constants/types';

const DEFAULT_USER_ID = 'test-user-1';

const getUserIdHeader = async () => {
  const userId = process.env.EXPO_PUBLIC_USER_ID ?? DEFAULT_USER_ID;
  return { 'X-User-Id': userId };
};

export const getWatchlist = async () => {
  const headers = await getUserIdHeader();
  return requestApi<WatchListItem[]>('/api/watchlist', { headers });
};

export const addToWatchlist = async (item: CreateWatchListItemRequest) => {
  const headers = await getUserIdHeader();
  return requestApi<string>('/api/watchlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(item),
  });
};

export const removeFromWatchlist = async (tmdbId: number) => {
  const headers = await getUserIdHeader();
  return requestApi<string>(`/api/watchlist/${tmdbId}`, {
    method: 'DELETE',
    headers,
  });
};
