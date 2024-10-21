import {Alert} from 'react-native';
import {openSettings} from 'react-native-permissions';

export const requestCameraPermission = () => {
  Alert.alert(
    'Camera Permission required',
    'Please enable camera access in settings to use the QR scanner',
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Open Settings', onPress: openSettings},
    ],
  );
};
