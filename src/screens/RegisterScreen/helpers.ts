import { Alert } from 'react-native';

export type RegisterFormData = {
  email: string;
  password: string;
  repeatPassword: string;
  surname: string;
  name: string;
};

export function validateRegisterForm(form: RegisterFormData): boolean {
  const { email, password, repeatPassword, surname, name } = form;

  if (
    !email.trim() ||
    !password.trim() ||
    !repeatPassword.trim() ||
    !surname.trim() ||
    !name.trim()
  ) {
    Alert.alert('Помилка', 'Заповніть усі поля.');
    return false;
  }

  if (!email.includes('@')) {
    Alert.alert('Помилка', 'Некоректний email.');
    return false;
  }

  if (password.length < 6) {
    Alert.alert('Помилка', 'Пароль має містити щонайменше 6 символів.');
    return false;
  }

  if (password !== repeatPassword) {
    Alert.alert('Помилка', 'Паролі не співпадають.');
    return false;
  }

  return true;
}

export function showRegisterSuccessAlert(
  name: string,
  surname: string,
  email: string,
  onPress?: () => void,
) {
  Alert.alert(
    'Успіх',
    `Реєстрацію завершено.\n\nІм’я: ${name}\nПрізвище: ${surname}\nEmail: ${email}`,
    [
      {
        text: 'Перейти до новин',
        onPress,
      },
    ],
  );
}
