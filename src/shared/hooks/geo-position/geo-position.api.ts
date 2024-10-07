import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const defaultGeoOptions = {
  enableHighAccuracy: true,
  timeout: 15_000,
  maximumAge: 60_000,
};

export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const result = await Geolocation.requestAuthorization('whenInUse');
      if (result === 'denied' || result === 'disabled') return false;

      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: "Allow to access this device's location?",
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED ? true : false;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
