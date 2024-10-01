import {useQuery} from '@tanstack/react-query';

import queryKeys from 'configs/query-keys';
import {getCurrentUserProfile} from './current-user-profile.api';

const useCurrentUserProfile = () =>
  useQuery({
    queryKey: queryKeys.getCurrentUserProfile(),
    queryFn: getCurrentUserProfile,
    staleTime: Infinity,
    gcTime: Infinity,
  });

export default useCurrentUserProfile;
