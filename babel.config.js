module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        safe: true,
        allowUndefined: false,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
          hooks: './src/shared/hooks',
          types: './src/shared/types',
          configs: './src/configs',
          src: './src',
        },
      },
    ],
  ],
};
