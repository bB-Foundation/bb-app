import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {QuestsStackParamList} from '../../navigation.types';
import Quests from 'src/modules/quests';
import Quest from 'src/modules/quest';

const QuestsStack: FC = () => {
  const Stack = createNativeStackNavigator<QuestsStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="quests-list" component={Quests} />
      <Stack.Screen name="quest" component={Quest} />
    </Stack.Navigator>
  );
};

export default QuestsStack;
