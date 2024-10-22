import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useQueryClient} from '@tanstack/react-query';

import {logOut} from './button.api';
import {clearSecureStorage} from 'src/shared/utils/secure-storage';
import {NavigationProp} from 'src/modules/navigation/navigation.types';
import {setIsLoading} from 'src/redux-store/slices/user-profile-page';

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const logOutHandler = async () => {
    dispatch(setIsLoading(true));

    try {
      await logOut();
      await clearSecureStorage();
      queryClient.clear();
    } finally {
      dispatch(setIsLoading(false));
      navigation.reset({index: 0, routes: [{name: 'sign-in'}]});
    }
  };

  return {logOutHandler};
};
