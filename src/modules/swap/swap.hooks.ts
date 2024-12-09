import {useState} from 'react';
import {useWebViewMessage} from 'react-native-react-bridge';
import Toast from 'react-native-toast-message';

import {isErrorMessage, WebAppEvents} from 'components/web-app/web-app.api';
import {
  getUserAccountAddress,
  getUserPrivateKey,
} from 'src/shared/utils/secure-storage';
import {getGems, swap} from './swap.api';
import {SwapLoomiEvent} from 'components/web-app/web-app.types';
import useCurrentUserProfile from 'hooks/current-user';
import {Errors} from 'src/enums/errors';

export const useSwapLogic = () => {
  const {data: currentUserProfile} = useCurrentUserProfile();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        } catch (error) {
          showErrorToast();
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  });

  const startSwap = async () => {
    try {
      if (!currentUserProfile) throw Error('No current user profile');

      setIsSubmitting(true);

      const [privateKey, accountAddress] = await Promise.all([
        getUserPrivateKey(),
        getUserAccountAddress(),
      ]);

      if (!privateKey || !accountAddress) {
        setIsSubmitting(false);
        showErrorToast();
        throw Error('Inconsistent SwapLoomiEvent data');
      }

      const gems = await getGems(currentUserProfile.userId);
      const tokenIds = gems.map(g => g.tokenId);

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

  return {
    isSubmitting,
    webBrowserRef,
    currentUserProfile,
    onWebBrowserMessage,
    startSwap,
  };
};
