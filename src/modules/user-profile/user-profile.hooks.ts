import {useSelector} from 'react-redux';

import {RootState} from 'src/redux-store';
import {truncate} from 'src/shared/utils/strings';

export const useUserProfileLogic = () => {
  const {isLoading} = useSelector((state: RootState) => state.userProfilePage);

  const accountAddress =
    '0x0116d24fa2ed8ced8e5c2e7da72e76212f104ff236cfb3c1033d611085df6b64';

  const reducedAccountAddress = truncate(accountAddress, 20);

  return {accountAddress, reducedAccountAddress, isLoading};
};
