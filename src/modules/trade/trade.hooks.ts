import {useCallback, useEffect, useMemo} from 'react';
import {useSelector} from '@xstate/react';

import {tradingActor} from './api/trading-machine';
import useCurrentUserProfile from 'hooks/current-user';
import {useFocusEffect} from '@react-navigation/native';
import {getTradingSocket} from 'src/shared/api/sockets';

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

  const tradingSocket = useMemo(() => getTradingSocket(), []);

  // Start base trading machine
  useEffect(() => {
    if (!currentUserProfile) return;

    tradingActor.send({
      type: 'start',
      userId: currentUserProfile.userId,
    });
  }, [currentUserProfile]);

  // remove socket listeners
  useFocusEffect(
    useCallback(() => {
      return () => {
        tradingSocket.removeAllListeners();
      };
    }, [tradingSocket]),
  );

  return {
    isWaitingTradeOffers,
    isAcceptTrade,
    isCreateTrade,
  };
};
