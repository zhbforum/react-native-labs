import React from 'react';
import { Alert, Linking, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { NewsCard } from '@components/NewsCard';
import { newsData } from '@data/news';
import { PrimaryButton } from '@components/PrimaryButton';
import { RootStackParamList } from '@navigation/types';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'News'>;

export function NewsScreen({ navigation }: Props) {
  const openArticle = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Error', `Unable to open the source link.\n${url}`);
    }
  };

  const handleNewsPress = (item: (typeof newsData)[number]) => {
    Alert.alert(
      item.title,
      `${item.description}\n\nSource: ${item.source}\nPublished: ${item.publishedAt}`,
      [
        {
          text: 'Open source ',
          onPress: () => openArticle(item.url),
        },
        {
          text: 'Close',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <ScreenContainer>
      <SectionTitle>Останні новини</SectionTitle>

      <PrimaryButton
        title="Перейти до галереї"
        onPress={() => navigation.navigate('Gallery')}
      />

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
