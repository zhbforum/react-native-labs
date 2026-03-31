import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '@navigation/types';
import { galleryData } from '@data/gallery';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';

import { usePhotoViewer } from './usePhotoViewer';
import { usePhotoViewerAnimation } from './usePhotoViewerAnimation';

type PhotoViewerRouteProp = RouteProp<RootStackParamList, 'PhotoViewer'>;
type GalleryItem = (typeof galleryData)[number];

export function PhotoViewerScreen() {
  const route = useRoute<PhotoViewerRouteProp>();
  const { width } = useWindowDimensions();

  const { scaleAnim, opacityAnim } = usePhotoViewerAnimation();

  const { flatListRef, currentIndex, handleMomentumScrollEnd, getItemLayout } =
    usePhotoViewer(route.params.initialIndex, width);

  const renderItem = ({ item }: ListRenderItemInfo<GalleryItem>) => (
    <View style={[styles.slide, { width }]}>
      <Animated.View
        style={[
          styles.imageWrapper,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </Animated.View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={galleryData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={getItemLayout}
        initialScrollIndex={route.params.initialIndex}
      />

      <Text style={styles.caption}>
        Фото №{galleryData[currentIndex]?.id} ({currentIndex + 1}/
        {galleryData.length})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 420,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  caption: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontSize: typography.body + 2,
    color: '#fff',
    fontWeight: '600',
  },
});
