type AuthForm = {
  email: string;
  password: string;
};

type ValidationErrors = {
  email: string;
  password: string;
};

type DemoCredentials = {
  email: string;
  password: string;
};

export function getAuthValidationErrors(form: AuthForm): ValidationErrors {
  const errors: ValidationErrors = {
    email: '',
    password: '',
  };

  const normalizedEmail = form.email.trim();
  const normalizedPassword = form.password.trim();

  if (!normalizedEmail) {
    errors.email = 'Введіть електронну пошту.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      errors.email = 'Некоректний формат електронної пошти.';
    }
  }

  if (!normalizedPassword) {
    errors.password = 'Введіть пароль.';
  }

  return errors;
}

export function isValidCredentials(
  form: AuthForm,
  demoCredentials: DemoCredentials,
): boolean {
  return (
    form.email.trim().toLowerCase() ===
      demoCredentials.email.trim().toLowerCase() &&
    form.password === demoCredentials.password
  );
}
