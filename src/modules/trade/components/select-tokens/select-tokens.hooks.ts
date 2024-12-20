import {useEffect, useMemo, useState} from 'react';
import Toast from 'react-native-toast-message';

import useGems from 'hooks/gems';
import {GemColor} from 'types/gem';
import {stackGemsByColor} from 'src/shared/api/gems';
import {Errors} from 'src/enums/errors';
import {UseSelectTokensData} from './select-tokens.types';

export const useSelectTokens = ({
  userId,
  submitHandler,
  submitValidator,
}: UseSelectTokensData) => {
  const [selectedGemColor, setSelectedGemColor] = useState<GemColor>();

  const {
    data: gems = [],
    isFetching: areFetchingGems,
    isError: loadingGemsError,
  } = useGems({userId});

  const stackedGems = useMemo(() => stackGemsByColor(gems), [gems]);

  const selectGemColor = (gemColor: GemColor) => {
    setSelectedGemColor(gemColor);
  };

  const onSubmitButtonPress = async () => {
    if (!selectedGemColor) throw new Error('Gem color is not selected');

    try {
      const selectedGemsAmount = stackedGems[selectedGemColor].length;

      if (submitValidator) {
        await submitValidator(selectedGemsAmount, selectedGemColor);
      }

      submitHandler(selectedGemColor);
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: Errors.UNKNOWN,
        });
      }
    }
  };

  // Show error messages
  useEffect(() => {
    if (loadingGemsError) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: Errors.UNKNOWN,
      });
    }
  }, [loadingGemsError]);

  return {
    stackedGems,
    selectedGemColor,
    isLoading: areFetchingGems,
    selectGemColor,
    onSubmitButtonPress,
  };
};
