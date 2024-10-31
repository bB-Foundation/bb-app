import {useDispatch} from 'react-redux';

import {applyFilters} from 'src/redux-store/slices/quests-page';
import {useButtonLogicProps} from './submit-button.types';

export const useButtonLogic = ({afterSubmitCb}: useButtonLogicProps = {}) => {
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(applyFilters());
    afterSubmitCb && afterSubmitCb();
  };

  return {submitHandler};
};
