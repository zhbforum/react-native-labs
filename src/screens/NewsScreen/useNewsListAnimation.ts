import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type AnimatedItem = {
  opacity: Animated.Value;
  translateY: Animated.Value;
};

export function useNewsListAnimation(itemsCount: number) {
  const animatedValues = useRef<AnimatedItem[]>(
    Array.from({ length: itemsCount }, () => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(20),
    })),
  ).current;

  useFocusEffect(
    useCallback(() => {
      animatedValues.forEach(item => {
        item.opacity.setValue(0);
        item.translateY.setValue(20);
      });

      const animations = animatedValues.map(item =>
        Animated.parallel([
          Animated.timing(item.opacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(item.translateY, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
      );

      Animated.stagger(120, animations).start();

      return undefined;
    }, [animatedValues]),
  );

  return animatedValues;
}
