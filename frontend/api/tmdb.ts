const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') ?? 'http://localhost:5000';

export type TmdbConfigResponse = {
  images?: {
    secure_base_url?: string;
  };
};

export type MovieSearchResult = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
};

export type MovieSearchResponse = {
  results: MovieSearchResult[];
};

const getApiUrl = (path: string) => `${API_BASE_URL}${path}`;

const requestJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(getApiUrl(path));
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
};

export const fetchMovieConfig = () => requestJson<TmdbConfigResponse>('/api/movies/config');

export const searchMovies = (query: string) =>
  requestJson<MovieSearchResponse>(`/api/movies/search?query=${encodeURIComponent(query)}`);
