import React from 'react';
import { ScrollView } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { FormInput } from '@components/FormInput';
import { PrimaryButton } from '@components/PrimaryButton';
import { RootTabParamList } from '@navigation/types';
import { styles } from './styles';
import { useRegisterForm } from './useRegisterForm';

type Props = BottomTabScreenProps<RootTabParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const {
    email,
    password,
    repeatPassword,
    surname,
    name,
    setEmail,
    setPassword,
    setRepeatPassword,
    setSurname,
    setName,
    handleSubmit,
  } = useRegisterForm({ navigation });

  return (
    <ScreenContainer>
      <SectionTitle>Форма реєстрації</SectionTitle>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FormInput
          label="Електронна пошта"
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormInput
          label="Пароль"
          placeholder="Введіть пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <FormInput
          label="Повторіть пароль"
          placeholder="Повторіть пароль"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry
        />

        <FormInput
          label="Прізвище"
          placeholder="Ваше прізвище"
          value={surname}
          onChangeText={setSurname}
        />

        <FormInput
          label="Імʼя"
          placeholder="Ваше імʼя"
          value={name}
          onChangeText={setName}
        />

        <PrimaryButton title="Зареєструватися" onPress={handleSubmit} />
      </ScrollView>
    </ScreenContainer>
  );
}
