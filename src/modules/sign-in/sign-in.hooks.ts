import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {SignInFormFields} from './sign-in.types';
import {signInFormSchema} from './sign-in.api';
import {NavigationProp} from '../navigation/navigation.types';
import useSignIn from 'hooks/sign-in';
import {getApiOrUnknownErrorMessage} from 'src/shared/utils/errors';
import {getJwtAccessToken} from 'src/shared/utils/secure-storage';

export const useIsPasswordVisible = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (): void => setIsPasswordVisible(v => !v);

  return {isPasswordVisible, togglePasswordVisibility};
};

export const useFormLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  const formData = useForm({
    resolver: yupResolver<SignInFormFields>(signInFormSchema),
    defaultValues: {
      email: 'test@gmail.com',
      password: '12345Aa!',
    },
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

  useEffect(() => {
    (async () => {
      const accessToken = await getJwtAccessToken();
      if (accessToken) {
        navigation.reset({index: 0, routes: [{name: 'main'}]});
      }
    })();
  }, [navigation]);
};
