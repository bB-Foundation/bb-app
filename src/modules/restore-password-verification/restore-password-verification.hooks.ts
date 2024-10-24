import {useState} from 'react';
import {Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {
  NavigationProp,
  RootStackParamList,
} from '../navigation/navigation.types';
import {verifyPasswordRestore} from './restore-password-verification.api';
import {getApiOrUnknownErrorMessage} from 'src/shared/utils/errors';
import {useForgotPassword} from 'hooks/forgot-password';

export const useFormLogic = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const navigation = useNavigation<NavigationProp>();

  const {mutateAsync: verifyPasswordRestoreAsync, isPending: isSubmitting} =
    useVerifyPasswordRestore();

  const isValidVerificationCode = verificationCode.length === 6;

  const onSubmit = async () => {
    try {
      await verifyPasswordRestoreAsync(verificationCode);

      navigation.reset({
        index: 0,
        routes: [{name: 'restore-password', params: {verificationCode}}],
      });
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
      {
        text: 'OK',
        onPress: () =>
          navigation.reset({index: 0, routes: [{name: 'sign-in'}]}),
      },
    ]);

  return {exitToSignIn};
};

export const useResendEmail = () => {
  const {
    params: {email},
  } =
    useRoute<RouteProp<RootStackParamList, 'restore-password-verification'>>();

  const [isResendEmailUsed, setIsResendEmailUsed] = useState(false);

  const {mutateAsync: forgotPassword} = useForgotPassword();

  const resendEmailHandler = async () => {
    try {
      await forgotPassword(email);
      setIsResendEmailUsed(true);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getApiOrUnknownErrorMessage(error),
      });
    }
  };

  const onResendEmailTimerEnd = () => {
    setIsResendEmailUsed(false);
  };

  return {isResendEmailUsed, resendEmailHandler, onResendEmailTimerEnd};
};

const useVerifyPasswordRestore = () =>
  useMutation({
    mutationFn: verifyPasswordRestore,
  });
