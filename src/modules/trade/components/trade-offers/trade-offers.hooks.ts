import {useEffect, useState} from 'react';
import {useSelector} from '@xstate/react';
import {useQueryClient} from '@tanstack/react-query';

import {GemMetadata} from 'types/gem';
import {tradingActor} from '../../api/trading-machine';
import {getGemById} from 'src/shared/api/gems';
import queryKeys from 'configs/query-keys';

export const useTradeOffers = () => {
  const tradeOffers = useSelector(
    tradingActor,
    snapshot => snapshot.context.tradeOffers,
  );

  const queryClient = useQueryClient();

  const [initiatorGemDetailsByTrade, setInitiatorGemDetailsByTrade] = useState<
    Record<number, GemMetadata[]>
  >({});

  useEffect(() => {
    (async () => {
      const results: Record<number, any[]> = {};

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
