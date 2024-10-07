import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {applyFilters} from 'src/redux-store/slices/quests-page';
import {NavigationProp} from 'src/modules/navigation/navigation.types';

export const useButtonLogic = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation<NavigationProp>();

  const submitHandler = () => {
    dispatch(applyFilters());
    navigation.goBack();
  };

  return {submitHandler};
};
