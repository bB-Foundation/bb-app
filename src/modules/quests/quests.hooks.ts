import {useEffect, useRef, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux-store';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  RESULTS,
} from 'react-native-permissions';
import Toast from 'react-native-toast-message';

import useGeoPosition from 'hooks/geo-position';
import {
  hideLoader,
  showLoader as showLoaderFn,
} from 'src/redux-store/slices/quests-page';
import {defaultGeoOptions} from 'hooks/geo-position/geo-position.api';
import {Errors} from 'src/enums/errors';

export const useQuestsLogic = () => {
  const appState = useRef(AppState.currentState);

  const dispatch = useDispatch();

  const [isGeoPermissionGranted, setIsGeoPermissionGranted] = useState(false);

  const [geoOptions, setGeoOptions] = useState(defaultGeoOptions);

  const {showLoader: showLoader} = useSelector(
    (state: RootState) => state.questsPage,
  );

  const {
    geoPosition,
    getGeoPositionError,
    isPermissionDenied,
    isGetPermissionError,
  } = useGeoPosition(geoOptions);

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

  /** check geo permission on change appState from background to active */
  useEffect(() => {
    if (!isPermissionDenied && !isGetPermissionError) return;

    const handlePermission = (result: PermissionStatus) => {
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        setGeoOptions({...defaultGeoOptions});
        setIsGeoPermissionGranted(true);
      } else {
        setIsGeoPermissionGranted(false);
      }
    };

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/background/) && nextAppState === 'active') {
        if (Platform.OS === 'ios') {
          check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(handlePermission);
        } else {
          check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
            handlePermission,
          );
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [isPermissionDenied, isGetPermissionError]);

  /** show error toast on get geo position error */
  useEffect(() => {
    if (getGeoPositionError) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: Errors.UNKNOWN,
      });
    }
  }, [getGeoPositionError]);

  return {
    geoPosition,
    showLoader,
    isGeoPermissionProblem:
      (isPermissionDenied || isGetPermissionError) && !isGeoPermissionGranted,
  };
};
