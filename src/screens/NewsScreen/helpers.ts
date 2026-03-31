import { Alert, Linking } from 'react-native';

export async function openArticle(url?: string) {
  if (!url) {
    Alert.alert('Помилка', 'Посилання на джерело недоступне.');
    return;
  }

  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('Помилка', `Не вдалося відкрити посилання.\n${url}`);
  }
}
