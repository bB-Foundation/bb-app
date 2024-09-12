import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';

import {SignUpFormFields} from './sign-up.types';
import {signUpFormSchema} from './sign-up.api';
import {NavigationProp} from '../../navigation';

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

  const onSubmit = (data: SignUpFormFields) => console.log(data);

  const submitHandler = handleSubmit(onSubmit);

  return {formData, submitHandler};
};

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const onSignInButtonPress = (): void => {
    navigation.navigate('sign-in');
  };

  return {onSignInButtonPress};
};
