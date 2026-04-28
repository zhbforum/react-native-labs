import React from 'react';
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { NewsCard } from '@components/NewsCard';
import { colors } from '@theme/colors';

import { NewsHeader } from './components/NewsHeader';
import { styles } from './styles';
import { useNewsScreen } from './useNewsScreen';

export function NewsScreen() {
  const {
    user,
    news,
    isLoading,
    animatedValues,
    handleLogout,
    handleOpenNews,
  } = useNewsScreen();

  return (
    <ScreenContainer>
      <SectionTitle>Останні новини</SectionTitle>

      <NewsHeader user={user} onLogout={handleLogout} />

      {isLoading ? (
        <View style={styles.centerState}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : news.length === 0 ? (
        <View style={styles.centerState}>
          <Text style={styles.emptyText}>Новини ще не завантажені.</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {news.map((item, index) => (
            <Animated.View
              key={item.id}
              style={{
                opacity: animatedValues[index]?.opacity,
                transform: [
                  { translateY: animatedValues[index]?.translateY ?? 0 },
                ],
              }}
            >
              <NewsCard item={item} onPress={() => handleOpenNews(item.id)} />
            </Animated.View>
          ))}
        </ScrollView>
      )}
    </ScreenContainer>
  );
}
