import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux-store';

import {setEndDate} from 'src/redux-store/slices/quests-page';

export const useInputLogic = () => {
  const dispatch = useDispatch();

  const {
    modalQuestsFilters: {endDate},
  } = useSelector((state: RootState) => state.questsPage);

  const setEndDateHandler = (date: Date | null) => {
    dispatch(setEndDate(date ? date.toISOString() : undefined));
  };

  const endDateValue = endDate ? new Date(endDate) : undefined;

  return {date: endDateValue, onSelect: setEndDateHandler};
};
