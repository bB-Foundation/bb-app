import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {QrCodeStackParamList} from '../../navigation.types';
import QrScanner from 'src/modules/qr-scanner';
import {CheckMilestoneQrCode} from 'src/modules/check-milestone-qr-code';

const QrCodeStack: FC = () => {
  const Stack = createNativeStackNavigator<QrCodeStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="qr-scanner-camera" component={QrScanner} />
      <Stack.Screen
        name="check-milestone-qr-code"
        component={CheckMilestoneQrCode}
      />
    </Stack.Navigator>
  );
};

export default QrCodeStack;
