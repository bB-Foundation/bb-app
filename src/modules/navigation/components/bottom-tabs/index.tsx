import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import QuestsStack from '../quests-stack';
import QrCodeStack from '../qr-code-stack';
import { UserProfile } from 'src/modules/user-profile';

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
        component={QrCodeStack}
        options={{
          tabBarLabel: 'QR scanner',
          tabBarLabelStyle: {fontSize: 16},
          tabBarIcon: () => null,
        }}
      />
      <BottomTab.Screen
        name="user-profile"
        component={UserProfile}
        options={{
          tabBarLabel: 'User',
          tabBarLabelStyle: {fontSize: 16},
          tabBarIcon: () => null,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
