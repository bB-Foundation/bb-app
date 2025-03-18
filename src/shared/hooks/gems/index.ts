import {useQuery} from '@tanstack/react-query';

import {GemFilters} from './gems.types';
import queryKeys from 'configs/query-keys';
import {getGemById, getGems} from '../../api/gems';

const useGems = (filters: GemFilters) =>
  useQuery({
    queryKey: queryKeys.getGems(filters),
    queryFn: () => getGems(filters),
    enabled: filters.userId > 0,
  });

export const useGem = (gemId: number) =>
  useQuery({
    queryKey: queryKeys.getGemById(gemId),
    queryFn: () => getGemById(gemId),
    enabled: gemId > 0,
  });

export default useGems;
