import {useMutation} from '@tanstack/react-query';

import {logIn} from './sign-in.api';
import {storeJwtAccessToken, storeJwtRefreshToken} from '../../utils/secure-storage';

const useSignIn = () =>
  useMutation({
    mutationFn: logIn,
    onSuccess: async ({accessToken, refreshToken}) => {
      await Promise.all([
        storeJwtAccessToken(accessToken),
        storeJwtRefreshToken(refreshToken),
      ]);
    },
  });

export default useSignIn;
