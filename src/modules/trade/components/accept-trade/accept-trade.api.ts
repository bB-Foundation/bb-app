import Toast from 'react-native-toast-message';
import {getGemById} from 'src/shared/api/gems';

import {GemColor} from 'types/gem';
import {Trade} from 'types/trade';

export const tokenColorRecipientSelectValidation = async (
  trade: Trade,
  receiverGemsAmount: number,
  selectedGemsColor: GemColor,
) => {
  const initiatorGemsAmount = trade.initiatorGemIds.length;
  if (receiverGemsAmount !== initiatorGemsAmount) {
    throw Toast.show({
      type: 'error',
      text1: 'Error',
      text2: `Incorrect gems amount, please choose gems with minimum amount of ${initiatorGemsAmount}`,
    });
  }

  const initiatorFirstGem = await getGemById(trade.initiatorGemIds[0]);
  const initiatorGemsColor = initiatorFirstGem.attributes.color;
  if (initiatorGemsColor === selectedGemsColor) {
    throw Toast.show({
      type: 'error',
      text1: 'Error',
      text2: `Please choose gems with a color other than ${initiatorGemsColor}`,
    });
  }
};

export const validateGemsAmount = (
  gemsAmount: number,
  expectedGemsAmount: number,
) => {
  if (gemsAmount !== expectedGemsAmount) {
    throw Toast.show({
      type: 'error',
      text1: 'Error',
      text2: `Gems amount should be ${expectedGemsAmount}`,
    });
  }
};
