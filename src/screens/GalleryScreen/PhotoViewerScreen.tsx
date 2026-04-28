import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { GalleryItem } from '@data/gallery';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';
import { usePhotoViewerScreen } from './usePhotoViewerScreen';

export function PhotoViewerScreen() {
  const {
    width,
    gallery,
    currentIndex,
    initialIndex,
    flatListRef,
    scaleAnim,
    opacityAnim,
    handleMomentumScrollEnd,
    getItemLayout,
  } = usePhotoViewerScreen();

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
        data={gallery}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={getItemLayout}
        initialScrollIndex={initialIndex}
      />

      <Text style={styles.caption}>
        Фото №{gallery[currentIndex]?.id} ({currentIndex + 1}/{gallery.length})
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
    borderRadius: 8,
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
