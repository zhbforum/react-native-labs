import { NewsItem } from '@components/NewsCard';

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'React Native 0.84: Hermes V1 за замовчуванням',
    description:
      'Нове стабільне оновлення React Native принесло Hermes V1 by default, React 19.2.3, підтримку ESLint v9 Flat Config та покращення accessibility.',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    source: 'React Native Blog',
    publishedAt: '2026-02-11',
    url: 'https://reactnative.dev/blog/2026/02/11/react-native-0.84',
  },
  {
    id: 2,
    title: 'TypeScript 6.0 RC готує перехід до TypeScript 7',
    description:
      'Microsoft випустила Release Candidate для TypeScript 6.0. Це проміжний реліз перед TypeScript 7 і новою codebase, написаною на Go.',
    image: 'https://www.typescriptlang.org/icons/icon-512x512.png',
    source: 'Microsoft TypeScript Blog',
    publishedAt: '2026-03-10',
    url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-rc/',
  },
  {
    id: 3,
    title: 'JetBrains Air вийшов у Public Preview',
    description:
      'JetBrains представила Air — нове agentic-середовище розробки, де можна делегувати coding tasks кільком AI-агентам та працювати з кодом у спільному контексті.',
    image:
      'https://resources.jetbrains.com/storage/products/company/brand/logos/jb_square.png',
    source: 'JetBrains Blog',
    publishedAt: '2026-03-09',
    url: 'https://blog.jetbrains.com/air/2026/03/air-launches-as-public-preview-a-new-wave-of-dev-tooling-built-on-26-years-of-experience/',
  },
  {
    id: 4,
    title: 'JetBrains завершує підтримку Code With Me',
    description:
      'У JetBrains повідомили, що версія 2026.1 стане останньою з офіційною підтримкою Code With Me, а публічна relay-інфраструктура буде вимкнена у Q1 2027.',
    image:
      'https://resources.jetbrains.com/storage/products/company/brand/logos/jb_square.png',
    source: 'JetBrains Platform Blog',
    publishedAt: '2026-03-16',
    url: 'https://blog.jetbrains.com/platform/2026/03/sunsetting-code-with-me/',
  },
];
