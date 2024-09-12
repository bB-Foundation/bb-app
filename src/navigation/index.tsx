import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// PAGES
import SignIn from '../modules/sign-in';

const Stack = createNativeStackNavigator();

const Navigator: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Sign in" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
