import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ProfileStackParamList} from '../../navigation.types';
import {UserProfile} from 'src/modules/user-profile';
import FriendsChat from 'src/modules/friends-chat';
import Friends from 'src/modules/friends';

const ProfileStack: FC = () => {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="profile-main" component={UserProfile} />
      <Stack.Screen name="friends" component={Friends} />
      <Stack.Screen name="friends-chat" component={FriendsChat} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
