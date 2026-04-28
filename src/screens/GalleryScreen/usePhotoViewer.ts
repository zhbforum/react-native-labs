import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import type { GalleryItem } from '@data/gallery';

export function usePhotoViewer(initialIndex: number, width: number) {
  const flatListRef = useRef<FlatList<GalleryItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);

    const timer = setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [initialIndex]);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const getItemLayout = (
    _: ArrayLike<GalleryItem> | null | undefined,
    index: number,
  ) => ({
    length: width,
    offset: width * index,
    index,
  });

  return {
    flatListRef,
    currentIndex,
    handleMomentumScrollEnd,
    getItemLayout,
  };
}
