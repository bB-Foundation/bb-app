import {useNavigation} from '@react-navigation/native';

import {NavigationProp} from '../../navigation';

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToMain = (): void => navigation.replace('main');

  return {goToMain};
};
