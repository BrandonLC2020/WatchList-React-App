import { useMemo } from 'react';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, View } from 'react-native';

import { fetchMovieConfig, getMovieDetails } from '@/api/tmdb';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '@/api/watchlist';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { CreateWatchListItemRequest } from '@/constants/types';

const buildImageUrl = (baseUrl: string | null, size: string, path?: string | null) => {
  if (!baseUrl || !path) return null;
  return `${baseUrl}${size}${path}`;
};

export default function MovieDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const movieId = Number(Array.isArray(id) ? id[0] : id);
  const queryClient = useQueryClient();

  const configQuery = useQuery({
    queryKey: ['tmdb-config'],
    queryFn: fetchMovieConfig,
  });

  const detailsQuery = useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: Number.isFinite(movieId) && movieId > 0,
  });

  const watchlistQuery = useQuery({
    queryKey: ['watchlist'],
    queryFn: getWatchlist,
  });

  const addMutation = useMutation({
    mutationFn: addToWatchlist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['watchlist'] });
      void Haptics.selectionAsync();
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWatchlist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['watchlist'] });
      void Haptics.selectionAsync();
    },
  });

  const baseUrl = configQuery.data?.images?.secure_base_url ?? null;
  const details = detailsQuery.data?.details ?? null;
  const posterUrl = buildImageUrl(baseUrl, 'w780', details?.poster_path);

  const releaseYear = details?.release_date ? details.release_date.slice(0, 4) : null;

  const isInWatchlist = Boolean(
    watchlistQuery.data?.some((item) => item.tmdbId === movieId),
  );

  const handleToggleWatchlist = () => {
    if (!details) return;
    if (isInWatchlist) {
      removeMutation.mutate(movieId);
      return;
    }

    const payload: CreateWatchListItemRequest = {
      tmdbId: movieId,
      title: details.title ?? 'Untitled',
      type: 'movie',
      posterPath: details.poster_path ?? null,
      releaseYear: releaseYear ? Number(releaseYear) : null,
    };

    addMutation.mutate(payload);
  };

  const providers = useMemo(() => {
    const regionMap = detailsQuery.data?.providers?.results ?? {};
    return regionMap.US ?? Object.values(regionMap)[0] ?? null;
  }, [detailsQuery.data?.providers?.results]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#111111', dark: '#0F0F0F' }}
      headerImage={
        posterUrl ? (
          <Image source={{ uri: posterUrl }} style={styles.heroImage} contentFit="cover" />
        ) : (
          <View style={styles.heroPlaceholder} />
        )
      }>
      <ThemedView style={styles.headerActions}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol size={20} name="chevron.left" color="#EDEDED" />
        </Pressable>
        <Pressable
          onPress={handleToggleWatchlist}
          style={[styles.fab, isInWatchlist ? styles.fabActive : null]}>
          <IconSymbol
            size={20}
            name={isInWatchlist ? 'checkmark' : 'plus'}
            color={isInWatchlist ? '#111111' : '#EDEDED'}
          />
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.titleBlock}>
        <ThemedText type="title" style={styles.titleText}>
          {details?.title ?? 'Loading...'}
        </ThemedText>
        <ThemedText style={styles.subtitleText}>
          {releaseYear
            ? `${releaseYear} · ${details?.runtime ? `${details.runtime} min` : 'Runtime n/a'}`
            : 'Runtime unavailable'}
        </ThemedText>
      </ThemedView>

      {details?.tagline ? (
        <ThemedText style={styles.tagline}>{details.tagline}</ThemedText>
      ) : null}

      {details?.overview ? (
        <ThemedText style={styles.overview}>{details.overview}</ThemedText>
      ) : null}

      {providers ? (
        <ThemedView style={styles.providersSection}>
          <ThemedText type="subtitle" style={styles.providersTitle}>
            Where to Watch
          </ThemedText>
          <View style={styles.providerRow}>
            {(providers.flatrate ?? []).slice(0, 6).map((provider) => {
              const logoUrl = buildImageUrl(baseUrl, 'w154', provider.logo_path);
              if (!logoUrl) return null;
              return (
                <Image
                  key={provider.provider_id}
                  source={{ uri: logoUrl }}
                  style={styles.providerLogo}
                  contentFit="cover"
                  transition={300}
                />
              );
            })}
          </View>
        </ThemedView>
      ) : null}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 380,
  },
  heroPlaceholder: {
    width: '100%',
    height: 380,
    backgroundColor: '#1E1E1E',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
  },
  fab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
  },
  fabActive: {
    backgroundColor: '#F5C518',
  },
  titleBlock: {
    gap: 6,
  },
  titleText: {
    fontSize: 26,
  },
  subtitleText: {
    color: '#B5B5B5',
  },
  tagline: {
    marginTop: 12,
    color: '#E0E0E0',
    fontStyle: 'italic',
  },
  overview: {
    marginTop: 12,
    color: '#C7C7C7',
    lineHeight: 20,
  },
  providersSection: {
    marginTop: 24,
  },
  providersTitle: {
    marginBottom: 12,
  },
  providerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  providerLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
  },
});
