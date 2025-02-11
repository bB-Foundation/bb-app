import {useEffect} from 'react';
import {useSelector} from '@xstate/react';
import Toast from 'react-native-toast-message';

import {tradingActor, tradingSocket} from './api/trading-machine';
import useCurrentUserProfile from 'hooks/current-user';
import {getJwtAccessToken} from 'src/shared/utils/secure-storage';
import {Errors} from 'src/enums/errors';

export const useTradeLogic = () => {
  const {data: currentUserProfile} = useCurrentUserProfile();

  const isWaitingTradeOffers = useSelector(tradingActor, snapshot =>
    snapshot.matches('waitingTradeOffers'),
  );

  const isAcceptTrade = useSelector(tradingActor, snapshot =>
    snapshot.matches('acceptTrade'),
  );

  const isCreateTrade = useSelector(tradingActor, snapshot =>
    snapshot.matches('createTrade'),
  );

  // Switch to trading machine state
  useEffect(() => {
    (async () => {
      if (!currentUserProfile) return;

      try {
        const accessToken = await getJwtAccessToken();
        if (!accessToken) throw new Error('No access token');

        tradingSocket.emit('auth', accessToken);

        tradingActor.send({
          type: 'start',
          userId: currentUserProfile.userId,
          accessToken,
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: Errors.UNKNOWN,
        });
      }
    })();

    // TODO doesn't work
    // TODO doesn't work
    // TODO doesn't work
    return () => {
      tradingSocket.close();
    };
  }, [currentUserProfile]);

  return {
    isWaitingTradeOffers,
    isAcceptTrade,
    isCreateTrade,
  };
};
