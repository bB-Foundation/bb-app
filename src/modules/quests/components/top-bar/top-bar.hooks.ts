import {useNavigation} from '@react-navigation/native';

import {NavigationProp} from 'src/modules/navigation/navigation.types';

export const useTopBarLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  const openFiltersModal = () => {
    navigation.navigate('quests-filters-modal');
  };

  return {
    openFiltersModal,
  };
};
