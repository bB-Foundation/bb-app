import {useState} from 'react';
import {Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {RestorePasswordFormFields} from './restore-password.types';
import {
  restorePassword,
  restorePasswordFormSchema,
} from './restore-password.api';
import {NavigationProp, RootStackParamList} from '../../navigation';
import {getApiOrUnknownErrorMessage} from '../../utils';

export const useIsPasswordVisible = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (): void => setIsPasswordVisible(v => !v);

  return {isPasswordVisible, togglePasswordVisibility};
};

export const useFormLogic = () => {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<RouteProp<RootStackParamList, 'restore-password'>>();

  const formData = useForm({
    resolver: yupResolver<RestorePasswordFormFields>(restorePasswordFormSchema),
  });
  const {handleSubmit} = formData;

  const {mutateAsync: restorePasswordAsync, isPending: isSubmitting} =
    useRestorePassword();

  const onSubmit = async (data: RestorePasswordFormFields) => {
    try {
      await restorePasswordAsync({
        ...data,
        code: route.params.verificationCode,
      });
      navigation.navigate('restore-password-congrats');
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

  const exitToSignIn = (): void =>
    Alert.alert('Exit', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.replace('sign-in')},
    ]);

  return {exitToSignIn};
};

const useRestorePassword = () => useMutation({mutationFn: restorePassword});
