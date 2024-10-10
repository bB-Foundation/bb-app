import {useState} from 'react';
import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {resendEmailVerification, verifyEmail} from './email-verification.api';
import {
  NavigationProp,
  RootStackParamList,
} from '../navigation/navigation.types';
import { getApiOrUnknownErrorMessage } from 'src/shared/utils/errors';

export const useFormLogic = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const route = useRoute<RouteProp<RootStackParamList, 'email-verification'>>();

  const {mutateAsync: verifyEmailAsync, isPending: isSubmitting} =
    useVerifyEmail();

  const {mutateAsync: resendEmailVerificationAsync} =
    useResendEmailVerification();

  const navigation = useNavigation<NavigationProp>();

  const isValidVerificationCode = verificationCode.length === 6;

  const onSubmit = async () => {
    try {
      await verifyEmailAsync(verificationCode);
      navigation.navigate('new-account-congrats');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getApiOrUnknownErrorMessage(error),
      });
    }
  };

  const resendEmailVerification = async () => {
    try {
      await resendEmailVerificationAsync(route.params.email);
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
    resendEmailVerification,
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

const useVerifyEmail = () => useMutation({mutationFn: verifyEmail});

const useResendEmailVerification = () =>
  useMutation({mutationFn: resendEmailVerification});
