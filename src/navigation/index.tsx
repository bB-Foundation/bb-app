import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

// PAGES
import SignIn from '../modules/sign-in';
import SignUp from '../modules/sign-up';
import ForgotPassword from '../modules/forgot-password';
import RestorePasswordVerification from '../modules/restore-password-verification';
import EmailVerification from '../modules/email-verification';
import NewAccountCongrats from '../modules/new-account-congrats';
import Main from '../modules/main';
import RestorePasswordCongrats from '../modules/restore-password-congrats';

export type RootStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
  'restore-password-verification': undefined;
  'restore-password-congrats': undefined;
  'email-verification': {email: string};
  'new-account-congrats': undefined;
  main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator: FC = () => {
  return (
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
        <Stack.Screen
          name="restore-password-congrats"
          component={RestorePasswordCongrats}
        />
        <Stack.Screen name="email-verification" component={EmailVerification} />
        <Stack.Screen
          name="new-account-congrats"
          component={NewAccountCongrats}
        />
        <Stack.Screen name="main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
