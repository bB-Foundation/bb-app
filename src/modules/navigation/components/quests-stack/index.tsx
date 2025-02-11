import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {QuestsStackParamList} from '../../navigation.types';
import Quests from 'src/modules/quests';
import Quest from 'src/modules/quest';
import QuestChat from 'src/modules/quest-chat';

const QuestsStack: FC = () => {
  const Stack = createNativeStackNavigator<QuestsStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="quests-list" component={Quests} />
      <Stack.Screen name="quest" component={Quest} />
      <Stack.Screen
        options={({route}) => ({headerShown: true, title: route.params.title})}
        name="quest-chat"
        component={QuestChat}
      />
    </Stack.Navigator>
  );
};

export default QuestsStack;
