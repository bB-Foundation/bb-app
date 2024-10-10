import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {SignUpFormFields} from './sign-up.types';
import {signUp, signUpFormSchema} from './sign-up.api';
import {NavigationProp} from '../navigation/navigation.types';
import { getApiOrUnknownErrorMessage } from 'src/shared/utils/errors';

export const useIsPasswordVisible = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (): void => setIsPasswordVisible(v => !v);

  return {isPasswordVisible, togglePasswordVisibility};
};

export const useFormLogic = () => {
  const formData = useForm({
    resolver: yupResolver<SignUpFormFields>(signUpFormSchema),
  });
  const {handleSubmit} = formData;

  const {mutateAsync: signUpAsync, isPending} = useSignUp();

  const navigation = useNavigation<NavigationProp>();

  const onSubmit = async (data: SignUpFormFields) => {
    try {
      await signUpAsync(data);
      navigation.navigate('email-verification', {
        email: data.email,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getApiOrUnknownErrorMessage(error),
      });
    }
  };

  const submitHandler = handleSubmit(onSubmit);

  return {formData, submitHandler, isSubmitting: isPending};
};

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const onSignInButtonPress = (): void => {
    navigation.navigate('sign-in');
  };

  return {onSignInButtonPress};
};

export const useSignUp = () =>
  useMutation({
    mutationFn: signUp,
  });
