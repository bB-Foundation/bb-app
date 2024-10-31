import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux-store';

import {setCountry} from 'src/redux-store/slices/quests-page';

export const useDropdownLogic = () => {
  const dispatch = useDispatch();

  const {
    modalQuestsFilters: {country},
  } = useSelector((state: RootState) => state.questsPage);

  const setCountryHandler = (value: string | null) => {
    dispatch(setCountry(value ?? undefined));
  };

  return {value: country, setCountryHandler};
};
