import {useEffect, useMemo} from 'react';
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

  const isGeoPermissionProblem = useMemo(
    () => !!getGeoPositionError || isPermissionDenied || isGetPermissionError,
    [getGeoPositionError, isPermissionDenied, isGetPermissionError],
  );
  /** show loader on mount */
  useEffect(() => {
    dispatch(showLoaderFn());
  }, [dispatch]);

  /** hide loader on error */
  useEffect(() => {
    if (isGeoPermissionProblem) {
      dispatch(hideLoader());
    }
  }, [isGeoPermissionProblem, dispatch]);

  return {geoPosition, showLoader, isGeoPermissionProblem};
};
