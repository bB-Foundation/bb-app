import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux-store';

import {setStartDate} from 'src/redux-store/slices/quests-page';

export const useInputLogic = () => {
  const dispatch = useDispatch();

  const {
    modalQuestsFilters: {startDate},
  } = useSelector((state: RootState) => state.questsPage);

  const setStartDateHandler = (date: Date | null) => {
    dispatch(setStartDate(date ? date.toISOString() : undefined));
  };

  const startDateValue = startDate ? new Date(startDate) : undefined;

  return {date: startDateValue, onSelect: setStartDateHandler};
};
