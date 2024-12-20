import Toast from 'react-native-toast-message';

export const defaultGemsAmountValidator = (
  amountStr: string,
  availableGemsAmount: number,
) => {
  const amount = Number(amountStr);

  if (amountStr === '' || isNaN(amount)) {
    throw Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Gems amount is not valid',
    });
  }

  if (amount < 2) {
    throw Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Gems amount can not be less than 2',
    });
  }

  if (amount > availableGemsAmount) {
    throw Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'The value exceeds amount of your gems',
    });
  }

  return amount;
};
