import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import { useAppContext } from '@context/AppContext';
import {
  createGalleryItem,
  createRandomGallery,
  galleryData,
  GalleryItem,
} from '@data/gallery';
import { RootStackParamList } from '@navigation/types';
import { initializeDatabase } from '../../database/database';
import { formatDatabaseError } from '../../database/errors';
import {
  addFavoritePhoto,
  getFavoritePhotoIds,
  removeFavoritePhoto,
} from '../../database/gallery/queries';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type GalleryFilter = 'all' | 'favorites';

export function useGalleryScreen() {
  const { user } = useAppContext();
  const navigation = useNavigation<NavigationProp>();
  const [randomGallery, setRandomGallery] =
    useState<GalleryItem[]>(galleryData);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [filter, setFilter] = useState<GalleryFilter>('all');

  useFocusEffect(
    useCallback(() => {
      setRandomGallery(user?.id ? createRandomGallery() : galleryData);
    }, [user?.id]),
  );

  useEffect(() => {
    let isMounted = true;

    async function loadFavorites() {
      if (!user?.id) {
        setFavoriteIds([]);
        setFilter('all');
        return;
      }

      try {
        const db = await initializeDatabase();
        const storedFavoriteIds = await getFavoritePhotoIds(db, user.id);

        if (isMounted) {
          setFavoriteIds(storedFavoriteIds);
        }
      } catch (error) {
        console.warn(
          'Failed to load favorite photos.',
          formatDatabaseError(error),
        );
      }
    }

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const favoriteIdsSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const gallery = useMemo(() => {
    if (filter === 'favorites') {
      return favoriteIds.map(createGalleryItem);
    }

    return randomGallery;
  }, [favoriteIds, filter, randomGallery]);

  const handleOpenPhoto = useCallback(
    (initialIndex: number) => {
      navigation.navigate('PhotoViewer', {
        initialIndex,
        photoIds: gallery.map(item => item.id),
      });
    },
    [gallery, navigation],
  );

  const handleToggleFavorite = useCallback(
    async (photoId: number) => {
      if (!user?.id) {
        return;
      }

      const isFavorite = favoriteIdsSet.has(photoId);

      setFavoriteIds(currentIds =>
        isFavorite
          ? currentIds.filter(currentId => currentId !== photoId)
          : [photoId, ...currentIds],
      );

      try {
        const db = await initializeDatabase();

        if (isFavorite) {
          await removeFavoritePhoto(db, user.id, photoId);
        } else {
          await addFavoritePhoto(db, user.id, photoId);
          Toast.show({
            type: 'success',
            text1: 'Додано в обрані',
          });
        }
      } catch (error) {
        console.warn(
          'Failed to toggle favorite photo.',
          formatDatabaseError(error),
        );

        setFavoriteIds(currentIds =>
          isFavorite
            ? [photoId, ...currentIds]
            : currentIds.filter(currentId => currentId !== photoId),
        );
      }
    },
    [favoriteIdsSet, user?.id],
  );

  return {
    user,
    gallery,
    filter,
    favoritesCount: favoriteIds.length,
    favoriteIdsSet,
    canUseFavorites: Boolean(user?.id),
    setFilter,
    handleOpenPhoto,
    handleToggleFavorite,
  };
}
