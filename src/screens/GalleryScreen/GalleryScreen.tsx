import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { galleryData } from '@data/gallery';
import { GalleryTile } from '@components/GalleryTile';
import { useAppContext } from '@context/AppContext';
import { styles } from './styles';

export function GalleryScreen() {
  const { user } = useAppContext();

  return (
    <ScreenContainer>
      <SectionTitle>Фотогалерея</SectionTitle>

      {user ? (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>
            Галерея користувача: {user.name} {user.surname}
          </Text>
        </View>
      ) : (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>
            Для персоналізації зареєструйтеся.
          </Text>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {galleryData.map(item => (
            <GalleryTile
              key={item.id}
              image={item.image}
              onPress={() =>
                Alert.alert(
                  'Фото',
                  user
                    ? `Користувач ${user.name} відкрив фото №${item.id}`
                    : `Відкрито фото №${item.id}`,
                )
              }
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
