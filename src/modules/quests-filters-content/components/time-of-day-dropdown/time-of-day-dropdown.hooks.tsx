import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux-store';

import {setTimeOfDay} from 'src/redux-store/slices/quests-page';
import {TimeOfDay} from 'types/quest/quest-filters';

export const useDropdownLogic = () => {
  const dispatch = useDispatch();

  const {
    modalQuestsFilters: {timeOfDay},
  } = useSelector((state: RootState) => state.questsPage);

  const setTimeOfDayHandler = (value: TimeOfDay | null) => {
    dispatch(setTimeOfDay(value ?? undefined));
  };

  return {value: timeOfDay, setTimeOfDayHandler};
};
