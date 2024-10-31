import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from 'src/redux-store';
import {setDistance} from 'src/redux-store/slices/quests-page';

export const useSliderLogic = () => {
  const dispatch = useDispatch();

  const {
    modalQuestsFilters: {distance},
  } = useSelector((state: RootState) => state.questsPage);

  const [distanceLabelValue, setDistanceLabelValue] = useState(distance);

  const setDistanceHandler = (value: number) => dispatch(setDistance(value));

  /** update slider value */
  useEffect(() => {
    setDistanceLabelValue(distance);
  }, [distance]);

  return {distanceLabelValue, setDistanceLabelValue, setDistanceHandler};
};
