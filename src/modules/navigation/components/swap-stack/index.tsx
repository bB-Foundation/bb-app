import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SwapStackParamList} from '../../navigation.types';
import Swap from 'src/modules/swap';

const SwapStack: FC = () => {
  const Stack = createNativeStackNavigator<SwapStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="main" component={Swap} />
    </Stack.Navigator>
  );
};

export default SwapStack;
