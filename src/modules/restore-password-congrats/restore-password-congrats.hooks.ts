import {useNavigation} from '@react-navigation/native';

import {NavigationProp} from '../navigation/navigation.types';

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToSingIn = (): void => navigation.navigate('sign-in');

  return {goToSingIn};
};
