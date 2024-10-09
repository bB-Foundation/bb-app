import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import QuestsStack from '../questss-stack';
import QrScanner from 'src/modules/qr-scanner';

const BottomTabs = () => {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="quests"
        component={QuestsStack}
        options={{
          tabBarLabel: 'Quests',
          tabBarLabelStyle: {fontSize: 16},
          tabBarIcon: () => null,
        }}
      />
      <BottomTab.Screen
        name="qr-scanner"
        component={QrScanner}
        options={{
          tabBarLabel: 'QR scanner',
          tabBarLabelStyle: {fontSize: 16},
          tabBarIcon: () => null,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
