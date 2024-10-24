import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {ForgotPasswordFormFields} from './forgot-password.types';
import {forgotPasswordFormSchema} from './forgot-password.api';
import {NavigationProp} from '../navigation/navigation.types';
import {getApiOrUnknownErrorMessage} from 'src/shared/utils/errors';
import {useForgotPassword} from 'hooks/forgot-password';

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

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'restore-password-verification',
            params: {email},
          },
        ],
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

  return {formData, isSubmitting, submitHandler};
};

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const goBack = (): void => {
    navigation.goBack();
  };

  return {goBack};
};
