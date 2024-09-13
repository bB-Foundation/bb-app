import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';

import {ForgotPasswordFormFields} from './forgot-password.types';
import {forgotPasswordFormSchema} from './forgot-password.api';
import {NavigationProp} from '../../navigation';

export const useFormLogic = () => {
  const formData = useForm({
    resolver: yupResolver<ForgotPasswordFormFields>(forgotPasswordFormSchema),
  });
  const {handleSubmit} = formData;

  const onSubmit = (data: ForgotPasswordFormFields) => console.log(data);

  const submitHandler = handleSubmit(onSubmit);

  return {formData, submitHandler};
};

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const goBack = (): void => {
    navigation.goBack();
  };

  return {goBack};
};
