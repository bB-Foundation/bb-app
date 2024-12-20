import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import useCurrentUserProfile from 'hooks/current-user';
import useLoomis from 'hooks/loomis';
import {RootState} from 'src/redux-store';
import {truncate} from 'src/shared/utils/strings';
import Toast from 'react-native-toast-message';
import {Errors} from 'src/enums/errors';

export const useUserProfileLogic = () => {
  const {isLoading} = useSelector((state: RootState) => state.userProfilePage);

  const {data: currentUserProfile, isLoading: isCurrentUserProfileLoading} =
    useCurrentUserProfile();

  const {
    data: loomis = [],
    isLoading: areLoadingLoomis,
    isError: loadLoomisError,
  } = useLoomis({
    userId: currentUserProfile?.userId ?? 0,
  });

  const accountAddress = currentUserProfile?.accountAddress ?? '';

  const reducedAccountAddress = truncate(accountAddress, 20);

  // Show errors
  useEffect(() => {
    if (loadLoomisError) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: Errors.UNKNOWN,
      });
    }
  }, [loadLoomisError]);

  return {
    isLoading: isCurrentUserProfileLoading || areLoadingLoomis,
    showOverlayLoader: isLoading,
    userEmail: currentUserProfile?.email ?? '',
    accountAddress,
    reducedAccountAddress,
    loomis,
  };
};
