import {useEffect} from 'react';
import {RootState} from 'src/redux-store';
import {useDispatch, useSelector} from 'react-redux';

import useGeoPosition from 'hooks/geo-position';
import {
  hideLoader,
  showLoader as showLoaderFn,
} from 'src/redux-store/slices/quests-page';

export const useQuestsLogic = () => {
  const dispatch = useDispatch();

  const {showLoader: showLoader} = useSelector(
    (state: RootState) => state.questsPage,
  );

  const {
    geoPosition,
    getGeoPositionError,
    isPermissionDenied,
    isGetPermissionError,
  } = useGeoPosition();

  /** show loader on mount */
  useEffect(() => {
    dispatch(showLoaderFn());
  }, [dispatch]);

  /** hide loader on error */
  useEffect(() => {
    if (getGeoPositionError || isPermissionDenied || isGetPermissionError) {
      dispatch(hideLoader());
    }
  }, [getGeoPositionError, isPermissionDenied, isGetPermissionError, dispatch]);

  return {geoPosition, showLoader};
};
