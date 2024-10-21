module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-native-community|@ui-kitten|react-native-toast-message|react-navigation|@react-navigation/*|react-native-keychain|react-native-confirmation-code-field|react-native-aes-crypto|@d11/react-native-fast-image)/)',
  ],
  coveragePathIgnorePatterns: ['.*map.*', '.*web-app.*'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svg-mock.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
};
