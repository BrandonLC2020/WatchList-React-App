import { requestApi } from '@/api/client';
import {
  MovieDetailsResponse,
  TmdbConfiguration,
  TmdbPagedResponse,
  TmdbSearchResult,
} from '@/constants/types';

export const fetchMovieConfig = () => requestApi<TmdbConfiguration | null>('/api/movies/config');

export const searchMovies = (query: string) =>
  requestApi<TmdbPagedResponse<TmdbSearchResult> | null>(
    `/api/movies/search?query=${encodeURIComponent(query)}`,
  );

export const getTrendingMovies = () =>
  requestApi<TmdbPagedResponse<TmdbSearchResult> | null>('/api/movies/trending');

export const discoverMovies = (page = 1) =>
  requestApi<TmdbPagedResponse<TmdbSearchResult> | null>(`/api/movies/discover?page=${page}`);

export const getMovieDetails = (id: number) =>
  requestApi<MovieDetailsResponse | null>(`/api/movies/details/${id}`);
