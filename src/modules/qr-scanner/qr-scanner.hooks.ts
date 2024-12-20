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

    // useEffect(() => {
    //   const data = JSON.parse(
    //     '{"questId":7,"taskId":11,"taskCode":"NWVlZmI3MTQt"}',
    //   );

    //   navigation.navigate('check-quest-task-qr-code', data);
    // }, [navigation]);

  // USER 1

  // useEffect(() => {
  //   const data = JSON.parse('{"questId":1,"taskId":1,"taskCode":"NTZkZTIxZDQt"}');

  //   navigation.navigate('check-quest-task-qr-code', data);
  // }, [navigation]);

  // useEffect(() => {
  //   const data = JSON.parse(
  //     '{"questId":2,"taskId":2,"taskCode":"NGNmNDJiNmQt"}',
  //   );

  //   navigation.navigate('check-quest-task-qr-code', data);
  // }, [navigation]);

  // useEffect(() => {
  //   const data = JSON.parse(
  //     '{"questId":3,"taskId":4,"taskCode":"NjdhMGJmYWQt"}',
  //   );

  //   navigation.navigate('check-quest-task-qr-code', data);
  // }, [navigation]);

  // useEffect(() => {
  //   const data = JSON.parse(
  //     '{"questId":6,"taskId":9,"taskCode":"MWI1OGRiN2Et"}',
  //   );

  //   navigation.navigate('check-quest-task-qr-code', data);
  // }, [navigation]);

  // useEffect(() => {
  //   const data = JSON.parse(
  //     '{"questId":7,"taskId":11,"taskCode":"NWVlZmI3MTQt"}',
  //   );

  //   navigation.navigate('check-quest-task-qr-code', data);
  // }, [navigation]);

  // USER 2

  // useEffect(() => {
  //   const data = JSON.parse(
  //     '{"questId":3,"taskId":4,"taskCode":"ZWYwZjE3OWEt"}',
  //   );

  //   navigation.navigate('check-quest-task-qr-code', data);
  // }, [navigation]);

  // useEffect(() => {
  //   const data = JSON.parse(
  //     '{"questId":3,"taskId":5,"taskCode":"ZGZhZTU1OGUt"}',
  //   );

  //   navigation.navigate('check-quest-task-qr-code', data);
  // }, [navigation]);

  /** request camera permission */
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  return {codeScanner, hasPermission, device};
};
