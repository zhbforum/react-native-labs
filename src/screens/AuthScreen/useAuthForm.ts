import { useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';

import { useAppContext } from '@context/AppContext';
import { initializeDatabase } from '../../database/database';
import {
  getUserByCredentials,
  setCurrentUser,
  toUserData,
} from '../../database/users/queries';
import { AUTH_DEMO_CREDENTIALS } from './constants';
import { getAuthValidationErrors } from './helpers';

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

  const handleLogin = async () => {
    const currentErrors = getAuthValidationErrors({ email, password });

    if (currentErrors.email || currentErrors.password) {
      Toast.show({
        type: 'error',
        text1: 'Помилка авторизації',
        text2: 'Перевірте правильність заповнення полів.',
      });
      return;
    }

    try {
      const db = await initializeDatabase();
      const user = await getUserByCredentials(db, { email, password });

      if (!user) {
        Toast.show({
          type: 'error',
          text1: 'Помилка авторизації',
          text2: 'Невірна електронна пошта або пароль.',
        });
        return;
      }

      await setCurrentUser(db, user.id);
      setUser(toUserData(user));

      Toast.show({
        type: 'success',
        text1: 'Авторизація пройшла успішно',
        text2: `Вітаємо, ${user.name}!`,
      });

      resetForm();
      navigation.navigate('News');
    } catch (error) {
      console.warn('Failed to login user.', error);
      Toast.show({
        type: 'error',
        text1: 'Помилка бази даних',
        text2: 'Не вдалося прочитати локальні дані користувача.',
      });
    }
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
