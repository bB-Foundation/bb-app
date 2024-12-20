import {useEffect, useMemo, useState} from 'react';
import {useWebViewMessage} from 'react-native-react-bridge';
import Toast from 'react-native-toast-message';

import {isErrorMessage, WebAppEvents} from 'components/web-app/web-app.api';
import {
  getUserAccountAddress,
  getUserPrivateKey,
} from 'src/shared/utils/secure-storage';
import {getGemTokenIdOfEachColor, swap} from './swap.api';
import {SwapLoomiEvent} from 'components/web-app/web-app.types';
import useCurrentUserProfile from 'hooks/current-user';
import {Errors} from 'src/enums/errors';
import {stackGemsByColor} from 'src/shared/api/gems';
import useGems from 'hooks/gems';

export const useSwapLogic = () => {
  const {data: currentUserProfile} = useCurrentUserProfile();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: gems = [],
    isFetching: areFetchingGems,
    isError: loadingGemsError,
    refetch,
  } = useGems({userId: currentUserProfile?.userId ?? 0});

  const stackedGems = useMemo(() => stackGemsByColor(gems), [gems]);

  const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: Errors.UNKNOWN,
    });
  };

  const {
    ref: webBrowserRef,
    onMessage: onWebBrowserMessage,
    emit: emitToWebBrowser,
  } = useWebViewMessage(async message => {
    console.log('🚀 ~ useSwapLogic ~ message:', message);

    switch (message.type) {
      case WebAppEvents.SWAP_LOOMI_RESULT: {
        if (isErrorMessage(message)) {
          setIsSubmitting(false);
          return showErrorToast();
        }

        try {
          const {txHash} = message.data as {txHash: string};
          if (!txHash) {
            setIsSubmitting(false);
            showErrorToast();
            throw Error('No transaction hash');
          }

          await swap({txHash});

          await refetch();

          Toast.show({
            type: 'success',
            text1: 'Congratulations',
            text2: 'Swap was successfully submitted',
          });
        } catch (error) {
          console.log('🚀 ~ useSwapLogic ~ error 2:', error);
          showErrorToast();
        } finally {
          setIsSubmitting(false);
        }

        break;
      }
    }
  });

  const startSwap = async () => {
    try {
      if (!currentUserProfile) throw new Error('No current user profile');

      if (Object.keys(stackedGems).length < 5) {
        return Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'You need at least 5 gems of different colors to swap',
        });
      }

      setIsSubmitting(true);

      const {userId} = currentUserProfile;
      const [privateKey, accountAddress] = await Promise.all([
        getUserPrivateKey(userId),
        getUserAccountAddress(userId),
      ]);

      if (!privateKey || !accountAddress) {
        setIsSubmitting(false);
        showErrorToast();
        throw new Error('Inconsistent SwapLoomiEvent data');
      }

      const tokenIds = getGemTokenIdOfEachColor(stackedGems);

      const event: SwapLoomiEvent = {
        type: WebAppEvents.SWAP_LOOMI,
        data: {
          privateKey,
          accountAddress,
          tokenIds,
        },
      };
      emitToWebBrowser(event);
    } catch (error) {
      setIsSubmitting(false);
      showErrorToast();
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
    isLoading: areFetchingGems,
    stackedGems,
    isSubmitting,
    webBrowserRef,
    currentUserProfile,
    onWebBrowserMessage,
    startSwap,
  };
};
