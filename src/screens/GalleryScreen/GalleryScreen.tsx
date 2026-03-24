import React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { galleryData } from '@data/gallery';
import { GalleryTile } from '@components/GalleryTile';
import { PrimaryButton } from '@components/PrimaryButton';
import { RootStackParamList } from '@navigation/types';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Gallery'>;

export function GalleryScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <SectionTitle>Фотогалерея</SectionTitle>

      <PrimaryButton
        title="Перейти до реєстрації"
        onPress={() => navigation.navigate('Register')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {galleryData.map(item => (
            <GalleryTile
              key={item.id}
              image={item.image}
              onPress={() => Alert.alert('Фото', `Відкрито фото №${item.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
