import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from 'src/redux-store';
import {setMinRewards} from 'src/redux-store/slices/quests-page';

export const useSliderLogic = () => {
  const dispatch = useDispatch();

  const {
    modalQuestsFilters: {minRewards},
  } = useSelector((state: RootState) => state.questsPage);

  const [minRewardsLabelValue, setMinRewardsLabelValue] = useState(minRewards);

  const setMinRewardsHandler = (rewards: number) =>
    dispatch(setMinRewards(rewards));

  /** update slider value */
  useEffect(() => {
    setMinRewardsLabelValue(minRewards);
  }, [minRewards]);

  return {minRewardsLabelValue, setMinRewardsLabelValue, setMinRewardsHandler};
};
