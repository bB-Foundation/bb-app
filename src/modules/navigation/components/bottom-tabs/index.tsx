import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import QrScannerIcon from 'src/assets/images/bottom-tabs/qr-scanner.svg';
import MapIcon from 'src/assets/images/bottom-tabs/map.svg';
import TradeIcon from 'src/assets/images/bottom-tabs/trade.svg';
import SwapIcon from 'src/assets/images/bottom-tabs/swap.svg';
import UserIcon from 'src/assets/images/bottom-tabs/user.svg';
import QuestsStack from '../quests-stack';
import QrCodeStack from '../qr-code-stack';
import {UserProfile} from 'src/modules/user-profile';
import SwapStack from '../swap-stack';
import TradeStack from '../trade-stack';

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
          tabBarActiveTintColor: '#3366ff',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused}) => (
            <MapIcon
              width={27}
              height={27}
              fill={focused ? '#3366ff' : 'gray'}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="trade"
        component={TradeStack}
        options={{
          tabBarActiveTintColor: '#3366ff',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused}) => (
            <TradeIcon
              width={36}
              height={36}
              fill={focused ? '#3366ff' : 'gray'}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="qr-scanner"
        component={QrCodeStack}
        options={{
          tabBarLabelStyle: {display: 'none'},
          tabBarActiveTintColor: '#3366ff',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused}) => (
            <QrScannerIcon
              width={35}
              height={35}
              fill={focused ? '#3366ff' : 'gray'}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="swap"
        component={SwapStack}
        options={{
          tabBarActiveTintColor: '#3366ff',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused}) => (
            <SwapIcon
              width={27}
              height={27}
              fill={focused ? '#3366ff' : 'gray'}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="user-profile"
        component={UserProfile}
        options={{
          tabBarLabel: 'user',
          tabBarActiveTintColor: '#3366ff',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused}) => (
            <UserIcon
              width={27}
              height={27}
              fill={focused ? '#3366ff' : 'gray'}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
