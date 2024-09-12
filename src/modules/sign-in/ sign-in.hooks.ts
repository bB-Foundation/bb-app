import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// import {useNavigation} from '@react-navigation/native';

import {SignInFormFields} from './sign-in.types';
import {signInFormSchema} from './sign-in.api';

export const useIsPasswordVisible = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (): void => setIsPasswordVisible(v => !v);

  return {isPasswordVisible, togglePasswordVisibility};
};

export const useFormLogic = () => {
  const formData = useForm({
    resolver: yupResolver<SignInFormFields>(signInFormSchema),
  });
  const {handleSubmit} = formData;

  const onSubmit = (data: SignInFormFields) => console.log(data);

  const submitHandler = handleSubmit(onSubmit);

  return {formData, submitHandler};
};

export const useButtonHandlers = () => {
  // const navigation = useNavigation();

  const onSignUpButtonPress = (): void => {};

  const onForgotPasswordButtonPress = (): void => {};

  return {onSignUpButtonPress, onForgotPasswordButtonPress};
};
