import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { galleryData } from '@data/gallery';
import { GalleryTile } from '@components/GalleryTile';
import { useAppContext } from '@context/AppContext';
import { styles } from './styles';
import { RootStackParamList } from '@navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function GalleryScreen() {
  const { user } = useAppContext();
  const navigation = useNavigation<NavigationProp>();

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
          {galleryData.map((item, index) => (
            <GalleryTile
              key={item.id}
              image={item.image}
              onPress={() =>
                navigation.navigate('PhotoViewer', {
                  initialIndex: index,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
