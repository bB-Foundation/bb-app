import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {SignInFormFields} from './sign-in.types';
import {logIn, signInFormSchema} from './sign-in.api';
import {NavigationProp} from '../../navigation';
import {getApiOrUnknownErrorMessage} from '../../utils';

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

  const {mutateAsync: logInAsync, isPending: isSubmitting} = useLogIn();

  const onSubmit = async (data: SignInFormFields) => {
    try {
      await logInAsync(data);
      navigation.navigate('main');
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

const useLogIn = () => useMutation({mutationFn: logIn});
