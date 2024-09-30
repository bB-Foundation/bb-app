import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {SignInFormFields} from './sign-in.types';
import {signInFormSchema} from './sign-in.api';
import {NavigationProp} from '../navigation/navigation.types';
import {getApiOrUnknownErrorMessage} from '../../utils';
import {useSignIn} from '../../shared/hooks/sign-in';

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
