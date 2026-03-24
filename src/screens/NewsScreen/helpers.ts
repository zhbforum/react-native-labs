import { Alert, Linking } from 'react-native';
import { newsData } from '@data/news';

export type NewsItem = (typeof newsData)[number];

export async function openArticle(url: string) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('Error', `Unable to open the source link.\n${url}`);
  }
}

export function handleNewsPress(item: NewsItem) {
  Alert.alert(
    item.title,
    `${item.description}\n\nSource: ${item.source}\nPublished: ${item.publishedAt}`,
    [
      {
        text: 'Open source',
        onPress: () => openArticle(item.url),
      },
      {
        text: 'Close',
        style: 'cancel',
      },
    ],
  );
}
