import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ScreenContainer } from '@components/ScreenContainer';
import { SectionTitle } from '@components/SectionTitle';
import { FormInput } from '@components/FormInput';
import { PrimaryButton } from '@components/PrimaryButton';
import { useAppContext } from '@context/AppContext';
import { RootTabParamList } from '@navigation/types';
import { showRegisterSuccessAlert, validateRegisterForm } from './helpers';
import { styles } from './styles';

type Props = BottomTabScreenProps<RootTabParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { setUser } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    const form = {
      email,
      password,
      repeatPassword,
      surname,
      name,
    };

    if (!validateRegisterForm(form)) {
      return;
    }

    setUser({
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim(),
    });

    showRegisterSuccessAlert(name, surname, email, () =>
      navigation.navigate('News'),
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
