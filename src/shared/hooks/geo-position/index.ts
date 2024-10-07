import {useEffect, useState} from 'react';
import Geolocation, {
  GeoPosition,
  GeoOptions,
  GeoError,
} from 'react-native-geolocation-service';

import {defaultGeoOptions, requestLocationPermission} from './geo-position.api';

const useGeoPosition = (geoOptions?: GeoOptions) => {
  const [geoPosition, setGeoPosition] = useState<GeoPosition>();

  const [getGeoPositionError, setGetGeoPositionError] = useState<GeoError>();

  const [isPermissionDenied, setIsPermissionDenied] = useState<boolean>();

  const [isGetPermissionError, setIsGetPermissionError] = useState<boolean>();

  useEffect(() => {
    (async () => {
      try {
        const permission = await requestLocationPermission();
        if (!permission) {
          setIsPermissionDenied(true);
          return;
        }
      } catch (error) {
        setIsGetPermissionError(true);
      }

      Geolocation.getCurrentPosition(
        position => setGeoPosition(position),
        geoError => setGetGeoPositionError(geoError),
        geoOptions ?? defaultGeoOptions,
      );
    })();
  }, [geoOptions]);

  return {
    geoPosition,
    getGeoPositionError,
    isPermissionDenied,
    isGetPermissionError,
  };
};

export default useGeoPosition;
