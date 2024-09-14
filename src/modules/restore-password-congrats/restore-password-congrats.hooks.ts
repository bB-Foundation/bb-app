import {useNavigation} from '@react-navigation/native';

import {NavigationProp} from '../../navigation';

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToSingIn = (): void => navigation.navigate('sign-in');

  return {goToSingIn};
};
