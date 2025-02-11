import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TradeStackParamList} from '../../navigation.types';
import {Trade} from 'src/modules/trade';
import {TradeChat} from 'src/modules/trade-chat';

const TradeStack: FC = () => {
  const Stack = createNativeStackNavigator<TradeStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="main"
        component={Trade}
      />
      <Stack.Screen
        options={({route}) => ({title: route.params.title})}
        name="chat"
        component={TradeChat}
      />
    </Stack.Navigator>
  );
};

export default TradeStack;
