import {useQuery} from '@tanstack/react-query';

import queryKeys from 'configs/query-keys';
import {LoomisFilters} from './loomis.types';
import {getLoomis} from 'src/shared/api/loomis';

const useLoomis = (filters: LoomisFilters) =>
  useQuery({
    queryKey: queryKeys.getLoomis(filters),
    queryFn: () => getLoomis(filters),
    enabled: filters.userId > 0,
  });

export default useLoomis;
