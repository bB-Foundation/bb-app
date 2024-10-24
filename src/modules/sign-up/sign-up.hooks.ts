import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {SignUpFormFields} from './sign-up.types';
import {signUp, signUpFormSchema} from './sign-up.api';
import {NavigationProp} from '../navigation/navigation.types';
import {getApiOrUnknownErrorMessage} from 'src/shared/utils/errors';
import useSignIn from 'hooks/sign-in';
import {storeUserPassword} from 'src/shared/utils/secure-storage';

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

  const {mutateAsync: signUpAsync, isPending: isPendingSignUp} = useSignUp();

  const {mutateAsync: signIn, isPending: isPendingSignIn} = useSignIn();

  const navigation = useNavigation<NavigationProp>();

  const onSubmit = async (data: SignUpFormFields) => {
    try {
      await signUpAsync(data);
      await signIn(data);
      await storeUserPassword(data.password);

      navigation.reset({
        index: 0,
        routes: [{name: 'email-verification', params: {email: data.email}}],
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

  return {
    formData,
    submitHandler,
    isSubmitting: isPendingSignUp || isPendingSignIn,
  };
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
