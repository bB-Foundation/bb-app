import {Alert} from 'react-native';
import {openSettings} from 'react-native-permissions';

export const requestLocationPermission = () => {
  Alert.alert(
    'Location Permission required',
    'Please enable precise location access in settings to use the app',
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Open Settings', onPress: openSettings},
    ],
  );
};
