import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux-store';

import {setCategory} from 'src/redux-store/slices/quests-page';
import {QuestCategory} from 'types/quest';

export const useDropdownLogic = () => {
  const dispatch = useDispatch();

  const {
    modalQuestsFilters: {category},
  } = useSelector((state: RootState) => state.questsPage);

  const setCategoryHandler = (value: QuestCategory | null) => {
    dispatch(setCategory(value ?? undefined));
  };

  return {value: category, setCategoryHandler};
};
