import {useMutation} from '@tanstack/react-query';

import {logIn} from './sign-in.api';
import {
  storeJwtAccessToken,
  storeJwtRefreshToken,
  storeUserPassword,
} from '../../utils/secure-storage';

const useSignIn = () =>
  useMutation({
    mutationFn: logIn,
    onSuccess: async ({accessToken, refreshToken}, {password}) => {
      await Promise.all([
        storeUserPassword(password),
        storeJwtAccessToken(accessToken),
        storeJwtRefreshToken(refreshToken),
      ]);
    },
  });

export default useSignIn;
