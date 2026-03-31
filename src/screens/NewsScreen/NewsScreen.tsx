import React from 'react';
import { Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { NewsCard } from '@components/NewsCard';
import { newsData } from '@data/news';
import { useAppContext } from '@context/AppContext';
import { RootStackParamList } from '@navigation/types';

import { NewsHeader } from './components/NewsHeader';
import { styles } from './styles';
import { useNewsListAnimation } from './useNewsListAnimation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function NewsScreen() {
  const { user } = useAppContext();
  const navigation = useNavigation<NavigationProp>();
  const animatedValues = useNewsListAnimation(newsData.length);

  return (
    <ScreenContainer>
      <SectionTitle>Останні новини</SectionTitle>

      <NewsHeader user={user} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {newsData.map((item, index) => (
          <Animated.View
            key={item.id}
            style={{
              opacity: animatedValues[index]?.opacity,
              transform: [
                { translateY: animatedValues[index]?.translateY ?? 0 },
              ],
            }}
          >
            <NewsCard
              item={item}
              onPress={() =>
                navigation.navigate('NewsDetails', { newsId: item.id })
              }
            />
          </Animated.View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
