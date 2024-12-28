import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { colors, spacing, typography, shadows, borderRadius } from '../../theme';

interface AlgorithmCardProps {
  title: string;
  description: string;
  category?: string;
  onPress: () => void;
}

export const AlgorithmCard: React.FC<AlgorithmCardProps> = ({
  title,
  description,
  category,
  onPress,
}) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {category && (
          <Text style={styles.category}>{category.toUpperCase()}</Text>
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        
        {/* Spotify-style play button */}
        <View style={styles.playButton}>
          <Text style={styles.playText}>Try it</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    ...shadows.small,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  pressed: {
    backgroundColor: colors.hover,
    transform: [{ scale: 0.98 }],
  },
  content: {
    padding: spacing.lg,
  },
  category: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  title: {
    ...typography.subheader,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  playButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  playText: {
    ...typography.button,
    color: colors.text,
  },
});