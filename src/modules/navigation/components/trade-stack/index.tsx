import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TradeStackParamList} from '../../navigation.types';
import {Trade} from 'src/modules/trade';

const TradeStack: FC = () => {
  const Stack = createNativeStackNavigator<TradeStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="main"
        component={Trade}
      />
    </Stack.Navigator>
  );
};

export default TradeStack;
