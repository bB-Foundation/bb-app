import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux-store';

import {setCity} from 'src/redux-store/slices/quests-page';

export const useDropdownLogic = () => {
  const dispatch = useDispatch();

  const {
    modalQuestsFilters: {city},
  } = useSelector((state: RootState) => state.questsPage);

  const setCityHandler = (value: string | null) => {
    dispatch(setCity(value ?? undefined));
  };

  return {value: city, setCityHandler};
};
