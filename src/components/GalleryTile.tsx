import React from 'react';
import Lucide from '@react-native-vector-icons/lucide';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

type Props = {
  image: string;
  isFavorite?: boolean;
  showFavoriteButton?: boolean;
  onPress: () => void;
  onToggleFavorite?: () => void;
};

export function GalleryTile({
  image,
  isFavorite = false,
  showFavoriteButton = false,
  onPress,
  onToggleFavorite,
}: Props) {
  const handleToggleFavorite = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onToggleFavorite?.();
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: image }} style={styles.image} />

      {showFavoriteButton && (
        <Pressable
          onPress={handleToggleFavorite}
          style={({ pressed }) => [
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
            pressed && styles.favoriteButtonPressed,
          ]}
        >
          <Lucide
            name="heart"
            size={18}
            color={isFavorite ? '#fff' : colors.primary}
          />
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: spacing.sm + 2,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.97 }],
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  favoriteButtonActive: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  favoriteButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.94 }],
  },
});
