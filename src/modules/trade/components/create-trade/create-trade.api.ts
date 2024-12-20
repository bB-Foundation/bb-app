import Toast from 'react-native-toast-message';

export const validateTokenColorSelect = async (receiverGemsAmount: number) => {
  if (receiverGemsAmount < 2) {
    throw Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Please choose gems with amount of two or more',
    });
  }
};
