import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { GalleryTile } from '@components/GalleryTile';
import { styles } from './styles';
import { useGalleryScreen } from './useGalleryScreen';

export function GalleryScreen() {
  const {
    user,
    gallery,
    filter,
    favoritesCount,
    favoriteIdsSet,
    canUseFavorites,
    setFilter,
    handleOpenPhoto,
    handleToggleFavorite,
  } = useGalleryScreen();

  return (
    <ScreenContainer>
      <SectionTitle>Фотогалерея</SectionTitle>

      {user ? (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>
            Галерея користувача: {user.name} {user.surname}
          </Text>
        </View>
      ) : (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>
            Для персоналізації зареєструйтеся.
          </Text>
        </View>
      )}

      {canUseFavorites && (
        <View style={styles.filterRow}>
          <Pressable
            onPress={() => setFilter('all')}
            style={[
              styles.filterButton,
              filter === 'all' && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'all' && styles.filterTextActive,
              ]}
            >
              Усі
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter('favorites')}
            style={[
              styles.filterButton,
              filter === 'favorites' && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === 'favorites' && styles.filterTextActive,
              ]}
            >
              Обрані ({favoritesCount})
            </Text>
          </Pressable>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {gallery.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>В обраних поки немає фото.</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {gallery.map((item, index) => (
              <GalleryTile
                key={item.id}
                image={item.image}
                isFavorite={favoriteIdsSet.has(item.id)}
                showFavoriteButton={canUseFavorites}
                onPress={() => handleOpenPhoto(index)}
                onToggleFavorite={() => handleToggleFavorite(item.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
