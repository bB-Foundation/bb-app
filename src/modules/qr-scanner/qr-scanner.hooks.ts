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
      const questTaskStringData = codes[0].value;
      if (!questTaskStringData) return;

      const {
        questId,
        taskId,
        code,
      }: {questId: number; taskId: number; code: string} =
        JSON.parse(questTaskStringData);
      if (!taskId || !code || !questId) throw new Error('Invalid QR code data');

      await new Promise(res => setTimeout(res, 700));
      navigation.navigate('check-quest-task-qr-code', {
        questId,
        taskId,
        taskCode: code,
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
