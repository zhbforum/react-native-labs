import React from 'react';
import { ScrollView } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { NewsCard } from '@components/NewsCard';
import { newsData } from '@data/news';
import { useAppContext } from '@context/AppContext';
import { NewsHeader } from './components/NewsHeader';
import { handleNewsPress } from './helpers';
import { styles } from './styles';

export function NewsScreen() {
  const { user } = useAppContext();

  return (
    <ScreenContainer>
      <SectionTitle>Останні новини</SectionTitle>

      <NewsHeader user={user} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {newsData.map(item => (
          <NewsCard
            key={item.id}
            item={item}
            onPress={() => handleNewsPress(item)}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
