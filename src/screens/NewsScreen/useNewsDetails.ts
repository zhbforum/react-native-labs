import { useCallback, useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import type { NewsItem } from '@components/NewsCard';
import { RootStackParamList } from '@navigation/types';
import { initializeDatabase } from '../../database/database';
import { getNewsById } from '../../database/news/queries';
import { openArticle } from './helpers';

type NewsDetailsRouteProp = RouteProp<RootStackParamList, 'NewsDetails'>;

export function useNewsDetails() {
  const route = useRoute<NewsDetailsRouteProp>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadArticle() {
      try {
        const db = await initializeDatabase();
        const storedArticle = await getNewsById(db, route.params.newsId);

        if (isMounted && storedArticle) {
          setArticle(storedArticle);
        }
      } catch (error) {
        console.warn('Failed to load local article.', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, [route.params.newsId]);

  const handleOpenArticle = useCallback(() => {
    if (article) {
      openArticle(article.url);
    }
  }, [article]);

  return {
    article,
    isLoading,
    handleOpenArticle,
  };
}
