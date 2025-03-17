import {useCallback, useEffect, useMemo, useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {GemMetadata} from 'types/gem';
import {tradingActor, TradingEventType} from '../../api/trading-machine';
import {getGemById} from 'src/shared/api/gems';
import queryKeys from 'configs/query-keys';
import {Trade} from 'types/trade';
import {getUserTradeOffers} from './trade-offers.api';
import useCurrentUserProfile from 'hooks/current-user';
import {Errors} from 'src/enums/errors';
import {getTradingSocket} from 'src/shared/api/sockets';
import {useFocusEffect} from '@react-navigation/native';

export const useTradeOffers = () => {
  const queryClient = useQueryClient();

  const {data: currentUserProfile} = useCurrentUserProfile();
  const [tradeOffers, setTradeOffers] = useState<Trade[]>([]);

  const [initiatorGemDetailsByTrade, setInitiatorGemDetailsByTrade] = useState<
    Record<number, GemMetadata[]>
  >({});

  const tradingSocket = useMemo(() => getTradingSocket(), []);

  // load trade offers on render
  useEffect(() => {
    (async () => {
      if (!currentUserProfile) return;

      try {
        const offers = await getUserTradeOffers({
          userId: currentUserProfile.userId,
        });
        setTradeOffers(offers);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: Errors.UNKNOWN,
        });
      }
    })();
  }, [currentUserProfile]);

  // listen for new trades
  useFocusEffect(
    useCallback(() => {
      tradingSocket.on(TradingEventType.TradeInitialized, (trade: Trade) => {
        setTradeOffers(p => [...p, trade]);
      });
    }, [tradingSocket]),
  );

  // load gem images for trade offers
  useEffect(() => {
    (async () => {
      const results: Record<number, GemMetadata[]> = {};

      for (const {id: tradeId, initiatorGemIds} of tradeOffers) {
        const initiatorGem = await Promise.all(
          initiatorGemIds.map(id =>
            queryClient.ensureQueryData({
              queryKey: queryKeys.getGemById(id),
              queryFn: () => getGemById(id),
            }),
          ),
        );
        results[tradeId] = initiatorGem;
      }

      setInitiatorGemDetailsByTrade(results);
    })();
  }, [tradeOffers, queryClient]);

  return {tradeOffers, initiatorGemDetailsByTrade};
};

export const useHandlers = () => {
  const {data: currentUserProfile} = useCurrentUserProfile();

  const openTrade = (trade: Trade) => {
    if (!currentUserProfile) throw new Error('User is not logged in');

    const {userId} = currentUserProfile;

    if (trade.initiatorId === userId) {
      tradingActor.send({type: 'offer', currentTrade: trade});
    } else {
      tradingActor.send({type: 'accept', currentTrade: trade});
    }
  };

  return {openTrade};
};
