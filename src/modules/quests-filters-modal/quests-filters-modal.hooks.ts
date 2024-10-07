import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearModalQuestsFilters} from 'src/redux-store/slices/quests-page';

export const useQuestsFiltersLogic = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(clearModalQuestsFilters());
      };
    }, [dispatch]),
  );
};
