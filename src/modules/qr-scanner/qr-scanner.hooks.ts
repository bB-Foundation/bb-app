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
    onCodeScanned: async codes => {
      const questTaskId = codes[0].value;
      if (!questTaskId) return;

      await new Promise(res => setTimeout(res, 1100));
      navigation.navigate('check-quest-task-qr-code', {
        questTaskId: +questTaskId,
      });
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
