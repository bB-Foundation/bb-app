import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {QrCodeStackParamList} from '../../navigation.types';
import QrScanner from 'src/modules/qr-scanner';
import {CheckQuestTaskQrCode} from 'src/modules/check-quest-task-qr-code';

const QrCodeStack: FC = () => {
  const Stack = createNativeStackNavigator<QrCodeStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="qr-scanner-camera" component={QrScanner} />
      <Stack.Screen
        name="check-quest-task-qr-code"
        component={CheckQuestTaskQrCode}
      />
    </Stack.Navigator>
  );
};

export default QrCodeStack;
