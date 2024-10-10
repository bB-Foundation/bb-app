import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {ForgotPasswordFormFields} from './forgot-password.types';
import {forgotPassword, forgotPasswordFormSchema} from './forgot-password.api';
import {NavigationProp} from '../navigation/navigation.types';
import { getApiOrUnknownErrorMessage } from 'src/shared/utils/errors';

export const useFormLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  const formData = useForm({
    resolver: yupResolver<ForgotPasswordFormFields>(forgotPasswordFormSchema),
  });
  const {handleSubmit} = formData;

  const {mutateAsync: forgotPasswordAsync, isPending: isSubmitting} =
    useForgotPassword();

  const onSubmit = async ({email}: ForgotPasswordFormFields) => {
    try {
      await forgotPasswordAsync(email);
      navigation.navigate('restore-password-verification');
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

  const goBack = (): void => {
    navigation.goBack();
  };

  return {goBack};
};

const useForgotPassword = () => useMutation({mutationFn: forgotPassword});
