import { useState } from 'react';
import Toast from 'react-native-toast-message';

import { useAppContext } from '@context/AppContext';
import { initializeDatabase } from '../../database/database';
import { formatDatabaseError } from '../../database/errors';
import {
  createUser,
  getUserByEmail,
  setCurrentUser,
  toUserData,
} from '../../database/users/queries';
import { showRegisterSuccessAlert, validateRegisterForm } from './helpers';

type Navigation = {
  navigate: (screen: 'News') => void;
};

type Props = {
  navigation: Navigation;
};

export function useRegisterForm({ navigation }: Props) {
  const { setUser } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {
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

    try {
      const db = await initializeDatabase();
      const existingUser = await getUserByEmail(db, email);

      if (existingUser) {
        Toast.show({
          type: 'error',
          text1: 'Помилка реєстрації',
          text2: 'Користувач з таким email вже існує.',
        });
        return;
      }

      const user = await createUser(db, {
        name,
        surname,
        email,
        password,
      });

      await setCurrentUser(db, user.id);
      setUser(toUserData(user));

      showRegisterSuccessAlert(name, surname, email, () =>
        navigation.navigate('News'),
      );
    } catch (error) {
      console.warn('Failed to register user.', formatDatabaseError(error));
      Toast.show({
        type: 'error',
        text1: 'Помилка бази даних',
        text2: 'Не вдалося зберегти локальні дані користувача.',
      });
    }
  };

  return {
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
  };
}
