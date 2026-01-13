import { useEffect, useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { fetchMovieConfig, searchMovies } from '@/api/tmdb';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { TmdbSearchResult } from '@/constants/types';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';

export default function TabTwoScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const { numColumns, itemWidth, gap } = useResponsiveLayout({
    mobileColumns: 3,
    tabletColumns: 4,
    desktopColumns: 6,
    gap: 16,
    containerPadding: 32, // ParallaxScrollView default padding logic + list content padding
  });

  const configQuery = useQuery({
    queryKey: ['tmdb-config'],
    queryFn: fetchMovieConfig,
  });

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 350);

    return () => clearTimeout(handle);
  }, [query]);

  const searchQuery = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: Boolean(debouncedQuery),
  });

  const buildPosterUrl = useMemo(() => {
    const configBaseUrl = configQuery.data?.images?.secure_base_url ?? null;
    if (!configBaseUrl) {
      return (_: string | null | undefined) => null;
    }
    return (path: string | null | undefined) => (path ? `${configBaseUrl}w500${path}` : null);
  }, [configQuery.data?.images?.secure_base_url]);

  const results = (searchQuery.data?.results ?? []).filter(
    (result) => result.media_type !== 'person',
  );

  const suggestedTags = ['Oppenheimer', 'Animated', 'Marvel', 'Drama', 'Comedy', 'Thriller'];

  const handlePressItem = (item: TmdbSearchResult) => {
    router.push(`/movie/${item.id}`);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedText style={styles.subtitle}>Search for movies from your watchlist backend.</ThemedText>
      <ThemedView style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search movies..."
          placeholderTextColor="#9E9E9E"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.searchInput}
        />
        {searchQuery.isFetching ? <ActivityIndicator size="small" /> : null}
      </ThemedView>
      {searchQuery.isError ? (
        <ThemedText style={styles.errorText}>Search failed. Please try again.</ThemedText>
      ) : null}
      <FlatList
        key={numColumns} // Force re-render on column change
        data={results}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.listContent, { gap }]}
        numColumns={numColumns}
        columnWrapperStyle={[styles.gridRow, { gap }]}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const posterUrl = buildPosterUrl(item.poster_path);
          const title = item.title ?? item.name ?? '';
          return (
            <Pressable style={[styles.gridItem, { width: itemWidth, maxWidth: itemWidth }]} onPress={() => handlePressItem(item)}>
              {posterUrl ? (
                <Image
                  source={{ uri: posterUrl }}
                  style={styles.poster}
                  contentFit="cover"
                  transition={400}
                />
              ) : (
                <View style={styles.posterPlaceholder} />
              )}
              <ThemedText numberOfLines={2} style={styles.posterTitle}>
                {title}
              </ThemedText>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          query.trim() ? (
            <ThemedText style={styles.emptyText}>
              {searchQuery.isFetching ? 'Searching...' : 'No results yet.'}
            </ThemedText>
          ) : (
            <View style={styles.tagsContainer}>
              <ThemedText style={styles.emptyText}>Try one of these searches:</ThemedText>
              <View style={styles.tagsRow}>
                {suggestedTags.map((tag) => (
                  <Pressable key={tag} style={styles.tag} onPress={() => setQuery(tag)}>
                    <ThemedText style={styles.tagText}>{tag}</ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          )
        }
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  subtitle: {
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F1F1F1',
    color: '#1A1A1A',
  },
  errorText: {
    color: '#B00020',
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 24,
    gap: 16,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridItem: {
    flex: 1,
    maxWidth: '32%',
    gap: 8,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  posterPlaceholder: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  posterTitle: {
    fontSize: 12,
    color: '#D0D0D0',
  },
  emptyText: {
    color: '#6B6B6B',
    textAlign: 'center',
    marginTop: 12,
  },
  tagsContainer: {
    marginTop: 12,
    gap: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  tag: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#2B2B2B',
  },
  tagText: {
    color: '#EDEDED',
    fontSize: 12,
  },
});
