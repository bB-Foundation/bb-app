import {useDispatch} from 'react-redux';

import {resetModalQuestsFilters} from 'src/redux-store/slices/quests-page';

export const useButtonLogic = () => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(resetModalQuestsFilters());
  };

  return {onPress};
};
