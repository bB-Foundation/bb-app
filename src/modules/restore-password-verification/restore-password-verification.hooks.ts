import {useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {NavigationProp} from '../navigation/navigation.types';
import {verifyPasswordRestore} from './restore-password-verification.api';
import { getApiOrUnknownErrorMessage } from 'src/shared/utils/errors';

export const useFormLogic = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const navigation = useNavigation<NavigationProp>();

  const {mutateAsync: verifyPasswordRestoreAsync, isPending: isSubmitting} =
    useVerifyPasswordRestore();

  const isValidVerificationCode = verificationCode.length === 6;

  const onSubmit = async () => {
    try {
      await verifyPasswordRestoreAsync(verificationCode);
      navigation.navigate('restore-password', {verificationCode});
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getApiOrUnknownErrorMessage(error),
      });
    }
  };

  return {
    verificationCode,
    isValidVerificationCode,
    isSubmitting,
    setVerificationCode,
    onSubmit,
  };
};

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const exitToSignIn = (): void =>
    Alert.alert('Exit', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.replace('sign-in')},
    ]);

  return {exitToSignIn};
};

const useVerifyPasswordRestore = () =>
  useMutation({
    mutationFn: verifyPasswordRestore,
  });
