import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Card, HelperText, Text, TextInput } from 'react-native-paper';

import { ScreenContainer } from '@components/ScreenContainer';
import { RootTabParamList } from '@navigation/types';
import { useAuthForm } from './useAuthForm';
import { styles } from './styles';

type Props = BottomTabScreenProps<RootTabParamList, 'Auth'>;

export function AuthScreen({ navigation }: Props) {
  const {
    email,
    password,
    errors,
    demoCredentials,
    setEmail,
    setPassword,
    handleLogin,
  } = useAuthForm({ navigation });

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.wrapper}>
          <Text variant="headlineMedium" style={styles.title}>
            Форма авторизації
          </Text>

          <Text variant="bodyMedium" style={styles.subtitle}>
            Введіть облікові дані для входу
          </Text>

          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Електронна пошта"
                placeholder="Введіть email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
              <HelperText type="error" visible={Boolean(errors.email)}>
                {errors.email}
              </HelperText>

              <TextInput
                mode="outlined"
                label="Пароль"
                placeholder="Введіть пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
              <HelperText type="error" visible={Boolean(errors.password)}>
                {errors.password}
              </HelperText>

              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
              >
                Увійти
              </Button>
            </Card.Content>
          </Card>

          <Card style={styles.hintCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.hintTitle}>
                Тестові облікові дані
              </Text>
              <Text variant="bodyMedium" style={styles.hintText}>
                Email: {demoCredentials.email}
              </Text>
              <Text variant="bodyMedium" style={styles.hintText}>
                Пароль: {demoCredentials.password}
              </Text>
            </Card.Content>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}