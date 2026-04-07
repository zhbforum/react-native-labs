import { useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';

import { useAppContext } from '@context/AppContext';
import { AUTH_DEMO_CREDENTIALS } from './constants';
import { getAuthValidationErrors, isValidCredentials } from './helpers';

type Navigation = {
  navigate: (screen: 'News') => void;
};

type Props = {
  navigation: Navigation;
};

export function useAuthForm({ navigation }: Props) {
  const { setUser } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errors = useMemo(
    () => getAuthValidationErrors({ email, password }),
    [email, password],
  );

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = () => {
    const currentErrors = getAuthValidationErrors({ email, password });

    if (currentErrors.email || currentErrors.password) {
      Toast.show({
        type: 'error',
        text1: 'Помилка авторизації',
        text2: 'Перевірте правильність заповнення полів.',
      });
      return;
    }

    const success = isValidCredentials(
      { email, password },
      AUTH_DEMO_CREDENTIALS,
    );

    if (!success) {
      Toast.show({
        type: 'error',
        text1: 'Помилка авторизації',
        text2: 'Невірна електронна пошта або пароль.',
      });
      return;
    }

    setUser({
      name: AUTH_DEMO_CREDENTIALS.name,
      surname: AUTH_DEMO_CREDENTIALS.surname,
      email: AUTH_DEMO_CREDENTIALS.email,
    });

    Toast.show({
      type: 'success',
      text1: 'Авторизація пройшла успішно',
      text2: `Вітаємо, ${AUTH_DEMO_CREDENTIALS.name}!`,
    });

    resetForm();
    navigation.navigate('News');
  };

  return {
    email,
    password,
    errors,
    demoCredentials: AUTH_DEMO_CREDENTIALS,
    setEmail,
    setPassword,
    handleLogin,
  };
}
