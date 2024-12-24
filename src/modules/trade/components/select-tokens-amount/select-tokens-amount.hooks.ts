import {useMemo, useState} from 'react';
import {Keyboard} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useGems from 'hooks/gems';
import {stackGemsByColor} from 'src/shared/api/gems';
import {defaultGemsAmountValidator} from './select-tokens-amount.api';
import {UseSelectAmountData} from './select-tokens-amount.types';

export const useSelectAmount = ({
  userId,
  gemColor,
  submitHandler,
  submitValidator,
}: UseSelectAmountData) => {
  const [gemsAmountStr, setGemsAmountStr] = useState('');

  // TODO reduce downloading gems second time after select gem color step
  const {data: gems = [], isFetching: areFetchingGems} = useGems({userId});

  const gemsOfSelectedColor = useMemo(() => {
    if (!gemColor) throw new Error('Gem color is not selected');

    return stackGemsByColor(gems)[gemColor] ?? [];
  }, [gems, gemColor]);

  const onSubmitButtonPress = async () => {
    try {
      const gemsAmount = defaultGemsAmountValidator(
        gemsAmountStr,
        gemsOfSelectedColor.length,
      );

      if (submitValidator) {
        submitValidator(gemsAmount);
      }

      Keyboard.dismiss();
      await new Promise(resolve => setTimeout(resolve, 50));

      const gemsIdsForTrade = gemsOfSelectedColor
        .slice(0, gemsAmount)
        .map(g => g.tokenId);

      submitHandler(gemsIdsForTrade);
    } catch (error) {
      console.log('error:', error);
    }
  };

  return {
    isLoading: areFetchingGems,
    gemsOfSelectedColor,
    gemsAmountStr,
    setGemsAmountStr,
    onSubmitButtonPress,
  };
};

export const useLayout = () => {
  const {top} = useSafeAreaInsets();

  const mainContainerMarginTop = top ? 0 : 16;

  return {mainContainerMarginTop};
};
