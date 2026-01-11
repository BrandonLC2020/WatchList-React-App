import { useEffect, useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View } from 'react-native';

import { fetchMovieConfig, MovieSearchResult, searchMovies } from '@/api/tmdb';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const [query, setQuery] = useState('');
  const [configBaseUrl, setConfigBaseUrl] = useState<string | null>(null);
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    fetchMovieConfig()
      .then((config) => {
        if (!isActive) return;
        setConfigBaseUrl(config.images?.secure_base_url ?? null);
      })
      .catch(() => {
        if (!isActive) return;
        setErrorMessage('Unable to load image configuration.');
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setResults([]);
      setErrorMessage(null);
      setLoading(false);
      return;
    }

    let isActive = true;
    setLoading(true);

    const handle = setTimeout(() => {
      searchMovies(trimmedQuery)
        .then((response) => {
          if (!isActive) return;
          setResults(response.results ?? []);
          setErrorMessage(null);
        })
        .catch(() => {
          if (!isActive) return;
          setErrorMessage('Search failed. Please try again.');
        })
        .finally(() => {
          if (!isActive) return;
          setLoading(false);
        });
    }, 350);

    return () => {
      isActive = false;
      clearTimeout(handle);
    };
  }, [query]);

  const buildPosterUrl = useMemo(() => {
    if (!configBaseUrl) {
      return (_: string | null) => null;
    }
    return (path: string | null) => (path ? `${configBaseUrl}w500${path}` : null);
  }, [configBaseUrl]);

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
        {loading ? <ActivityIndicator size="small" /> : null}
      </ThemedView>
      {errorMessage ? <ThemedText style={styles.errorText}>{errorMessage}</ThemedText> : null}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const posterUrl = buildPosterUrl(item.poster_path);
          return (
            <ThemedView style={styles.resultRow}>
              {posterUrl ? (
                <Image source={{ uri: posterUrl }} style={styles.poster} contentFit="cover" />
              ) : (
                <View style={styles.posterPlaceholder} />
              )}
              <ThemedView style={styles.resultText}>
                <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                {item.release_date ? (
                  <ThemedText style={styles.releaseDate}>{item.release_date}</ThemedText>
                ) : null}
              </ThemedView>
            </ThemedView>
          );
        }}
        ListEmptyComponent={
          query.trim() ? (
            <ThemedText style={styles.emptyText}>
              {loading ? 'Searching...' : 'No results yet.'}
            </ThemedText>
          ) : (
            <ThemedText style={styles.emptyText}>Start typing to search for movies.</ThemedText>
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
    gap: 12,
  },
  resultRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  posterPlaceholder: {
    width: 80,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  resultText: {
    flex: 1,
    gap: 4,
  },
  releaseDate: {
    color: '#6B6B6B',
  },
  emptyText: {
    color: '#6B6B6B',
    textAlign: 'center',
    marginTop: 12,
  },
});
