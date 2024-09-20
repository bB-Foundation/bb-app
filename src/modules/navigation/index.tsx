import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import {useNavigator} from './navigation.hooks';
import {RootStackParamList} from './navigation.types';
import toastConfig from '../../configs/toast';
// PAGES
import SignIn from '../sign-in';
import SignUp from '../sign-up';
import ForgotPassword from '../forgot-password';
import RestorePasswordVerification from '../restore-password-verification';
import EmailVerification from '../email-verification';
import NewAccountCongrats from '../new-account-congrats';
import Main from '../main';
import RestorePasswordCongrats from '../restore-password-congrats';
import RestorePassword from '../restore-password';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator: FC = () => {
  const {toastTopOffset} = useNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="sign-in" component={SignIn} />
          <Stack.Screen name="sign-up" component={SignUp} />
          <Stack.Screen name="forgot-password" component={ForgotPassword} />
          <Stack.Screen
            name="restore-password-verification"
            component={RestorePasswordVerification}
          />
          <Stack.Screen name="restore-password" component={RestorePassword} />
          <Stack.Screen
            name="restore-password-congrats"
            component={RestorePasswordCongrats}
          />
          <Stack.Screen
            name="email-verification"
            component={EmailVerification}
          />
          <Stack.Screen
            name="new-account-congrats"
            component={NewAccountCongrats}
          />
          <Stack.Screen name="main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast position="top" topOffset={toastTopOffset} config={toastConfig} />
    </>
  );
};

export default Navigator;
