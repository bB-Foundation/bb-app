import {useQuery} from '@tanstack/react-query';

import queryKeys from 'configs/query-keys';
import {getTradeById} from 'src/shared/api/trade';

const useTrade = (tradeId: number) =>
  useQuery({
    queryKey: queryKeys.getTradeById(tradeId),
    queryFn: () => getTradeById(tradeId),
  });

export default useTrade;
