import {StyleSheet} from 'react-native';

export const imageStyles = StyleSheet.create({
  root: {
    width: '70%',
    aspectRatio: 1,
  },
});

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 'auto',
  },
  inputWrapper: {
    marginTop: 32,
    gap: 8,
  },
});
