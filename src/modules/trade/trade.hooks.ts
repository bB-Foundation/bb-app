import {useEffect} from 'react';
import {useSelector} from '@xstate/react';

import {tradingActor} from './api/trading-machine';
import useCurrentUserProfile from 'hooks/current-user';

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
    if (!currentUserProfile) return;

    tradingActor.send({
      type: 'start',
      userId: currentUserProfile.userId,
    });
  }, [currentUserProfile]);

  return {
    isWaitingTradeOffers,
    isAcceptTrade,
    isCreateTrade,
  };
};
