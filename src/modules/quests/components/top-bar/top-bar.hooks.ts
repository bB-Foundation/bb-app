import {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {ActionSheetRef} from 'react-native-actions-sheet';

import {clearModalQuestsFilters} from 'src/redux-store/slices/quests-page';

export const useTopBarLogic = () => {
  const filtersModalRef = useRef<ActionSheetRef>(null);

  const dispatch = useDispatch();

  const openFiltersModal = () => {
    filtersModalRef.current?.show();
  };

  const onFiltersModalClose = () => {
    dispatch(clearModalQuestsFilters());
  };

  const onFiltersModalApply = () => {
    filtersModalRef.current?.hide();
  };

  return {
    filtersModalRef,
    openFiltersModal,
    onFiltersModalClose,
    onFiltersModalApply,
  };
};
