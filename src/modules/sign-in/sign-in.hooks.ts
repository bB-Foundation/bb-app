import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';

import {SignInFormFields} from './sign-in.types';
import {signInFormSchema} from './sign-in.api';
import {NavigationProp} from '../navigation/navigation.types';
import useSignIn from 'hooks/sign-in';
import {getApiOrUnknownErrorMessage} from 'src/shared/utils/errors';
import useCurrentUserProfile from 'hooks/current-user';

export const useIsPasswordVisible = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (): void => setIsPasswordVisible(v => !v);

  return {isPasswordVisible, togglePasswordVisibility};
};

export const useFormLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  const formData = useForm({
    resolver: yupResolver<SignInFormFields>(signInFormSchema),
  });
  const {handleSubmit} = formData;

  const {mutateAsync: signIn, isPending: isSubmitting} = useSignIn();

  const onSubmit = async (data: SignInFormFields) => {
    try {
      await signIn(data);
      navigation.reset({index: 0, routes: [{name: 'main'}]});
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getApiOrUnknownErrorMessage(error),
      });
    }
  };

  const submitHandler = handleSubmit(onSubmit);

  return {formData, isSubmitting, submitHandler};
};

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const onSignUpButtonPress = (): void => {
    navigation.navigate('sign-up');
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation.navigate('forgot-password');
  };

  return {onSignUpButtonPress, onForgotPasswordButtonPress};
};

export const useCheckAuth = () => {
  const navigation = useNavigation<NavigationProp>();

  const {error, isSuccess} = useCurrentUserProfile();

  /** Redirect to main screen if user is authorized */
  useEffect(() => {
    const isUnauthorizedResponse =
      axios.isAxiosError(error) && error.response?.status === 401;

    const isNotUnauthorizedError = error && !isUnauthorizedResponse;

    if (isSuccess || isNotUnauthorizedError) {
      navigation.reset({index: 0, routes: [{name: 'main'}]});
    }

    setTimeout(() => SplashScreen.hide(), 1000);
  }, [isSuccess, error, navigation]);
};
