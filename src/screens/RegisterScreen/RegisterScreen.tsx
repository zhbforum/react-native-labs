import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { FormInput } from '@components/FormInput';
import { PrimaryButton } from '@components/PrimaryButton';
import { styles } from './styles';

export function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !repeatPassword.trim() ||
      !surname.trim() ||
      !name.trim()
    ) {
      Alert.alert('Помилка', 'Заповніть усі поля.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Помилка', 'Некоректний email.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль має містити щонайменше 6 символів.');
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert('Помилка', 'Паролі не співпадають.');
      return;
    }

    Alert.alert(
      'Успіх',
      `Реєстрацію завершено.\n\nІм’я: ${name}\nПрізвище: ${surname}\nEmail: ${email}`,
    );
  };

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
          label="Ім’я"
          placeholder="Ваше ім’я"
          value={name}
          onChangeText={setName}
        />

        <PrimaryButton title="Зареєструватися" onPress={handleSubmit} />
      </ScrollView>
    </ScreenContainer>
  );
}
