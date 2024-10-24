import {useNavigation} from '@react-navigation/native';

import {NavigationProp} from '../navigation/navigation.types';

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToSingIn = (): void =>
    navigation.reset({index: 0, routes: [{name: 'sign-in'}]});

  return {goToSingIn};
};
