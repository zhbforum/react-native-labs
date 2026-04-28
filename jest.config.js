module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(ttf|otf|png|jpg|jpeg|gif|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|react-native-paper|react-native-safe-area-context|react-native-screens|react-native-toast-message|@react-native-vector-icons)/)',
  ],
};
