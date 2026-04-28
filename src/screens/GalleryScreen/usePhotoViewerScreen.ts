import { RouteProp, useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { createGalleryItem, galleryData } from '@data/gallery';
import { RootStackParamList } from '@navigation/types';
import { usePhotoViewer } from './usePhotoViewer';
import { usePhotoViewerAnimation } from './usePhotoViewerAnimation';

type PhotoViewerRouteProp = RouteProp<RootStackParamList, 'PhotoViewer'>;

export function usePhotoViewerScreen() {
  const route = useRoute<PhotoViewerRouteProp>();
  const { width } = useWindowDimensions();
  const gallery = useMemo(() => {
    if (!route.params.photoIds) {
      return galleryData;
    }

    return route.params.photoIds.map(createGalleryItem);
  }, [route.params.photoIds]);
  const { scaleAnim, opacityAnim } = usePhotoViewerAnimation();
  const { flatListRef, currentIndex, handleMomentumScrollEnd, getItemLayout } =
    usePhotoViewer(route.params.initialIndex, width);

  return {
    width,
    gallery,
    currentIndex,
    initialIndex: route.params.initialIndex,
    flatListRef,
    scaleAnim,
    opacityAnim,
    handleMomentumScrollEnd,
    getItemLayout,
  };
}
