import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const USER_ID = process.env.EXPO_PUBLIC_USER_ID ?? 'test-user-1';

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText style={styles.subtitle}>Authentication is coming soon.</ThemedText>

      <View style={styles.card}>
        <ThemedText type="defaultSemiBold">Current User</ThemedText>
        <ThemedText style={styles.userId}>{USER_ID}</ThemedText>
        <Pressable style={styles.button}>
          <ThemedText style={styles.buttonText}>Connect Firebase</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  subtitle: {
    color: '#9C9C9C',
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    gap: 10,
  },
  userId: {
    color: '#CFCFCF',
  },
  button: {
    marginTop: 6,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
  },
  buttonText: {
    color: '#EDEDED',
  },
});
