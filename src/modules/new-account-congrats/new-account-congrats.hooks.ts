import {useNavigation} from '@react-navigation/native';

import {NavigationProp} from '../navigation/navigation.types';

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToMain = (): void => navigation.replace('main');

  return {goToMain};
};
