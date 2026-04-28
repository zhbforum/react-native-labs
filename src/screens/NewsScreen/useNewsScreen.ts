import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { NewsItem } from '@components/NewsCard';
import { useAppContext } from '@context/AppContext';
import { RootStackParamList } from '@navigation/types';
import { initializeDatabase } from '../../database/database';
import { getNewsList } from '../../database/news/queries';
import { useNewsListAnimation } from './useNewsListAnimation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function useNewsScreen() {
  const { user, setUser } = useAppContext();
  const navigation = useNavigation<NavigationProp>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const animatedValues = useNewsListAnimation(news.length);

  useEffect(() => {
    let isMounted = true;

    async function loadNews() {
      try {
        const db = await initializeDatabase();
        const storedNews = await getNewsList(db);

        if (isMounted) {
          setNews(storedNews);
        }
      } catch (error) {
        console.warn('Failed to load local news.', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const handleOpenNews = useCallback(
    (newsId: number) => {
      navigation.navigate('NewsDetails', { newsId });
    },
    [navigation],
  );

  return {
    user,
    news,
    isLoading,
    animatedValues,
    handleLogout,
    handleOpenNews,
  };
}
