import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {NavigationProp} from '../../navigation';
import {useState} from 'react';

export const useFormLogic = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const onSubmit = () => console.log(verificationCode);

  return {verificationCode, setVerificationCode, onSubmit};
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

  const resendVerificationCode = (): void => {};

  return {exitToSignIn, resendVerificationCode};
};
