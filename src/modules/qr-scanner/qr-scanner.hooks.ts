import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {NavigationProp} from '../navigation/navigation.types';

export const useQrScannerLogic = () => {
  const device = useCameraDevice('back');

  const {hasPermission, requestPermission} = useCameraPermission();

  const navigation = useNavigation<NavigationProp>();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const milestoneUuid = codes[0].value;
      if (!milestoneUuid) return;

      navigation.navigate('check-milestone-qr-code', {milestoneUuid});
    },
  });

  /** request camera permission */
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  return {codeScanner, hasPermission, device};
};
