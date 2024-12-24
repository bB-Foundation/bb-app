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
  submitButtonWrapper: {
    marginTop: 'auto',
  },
  submitButton: {
    marginTop: 16,
  },
  inputWrapper: {
    marginTop: 32,
    gap: 8,
  },
});
