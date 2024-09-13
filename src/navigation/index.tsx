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

type RootStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
