import {useMutation} from '@tanstack/react-query';

import {signIn} from '../../api/sign-in';
import {
  storeJwtAccessToken,
  storeJwtRefreshToken,
} from '../../utils/secure-storage';

const useSignIn = () =>
  useMutation({
    mutationFn: signIn,
    onSuccess: async ({accessToken, refreshToken}) => {
      await Promise.all([
        storeJwtAccessToken(accessToken),
        storeJwtRefreshToken(refreshToken),
      ]);
    },
  });

export default useSignIn;
