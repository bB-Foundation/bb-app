import React from 'react';
import {View} from 'react-native';
import {useStyleSheet} from '@ui-kitten/components';
import {RouteProp, useRoute} from '@react-navigation/native';

import {Chat} from '../../components/chat';
import themedStyles from './friends-chat.styles';
import {ProfileStackParamList} from '../navigation/navigation.types';

const FriendsChat = () => {
  const {
    params: {socket, chatRoomId, groupPgpPublicKey},
  } = useRoute<RouteProp<ProfileStackParamList, 'friends-chat'>>();

  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      <Chat
        chatSocket={socket}
        chatRoomId={chatRoomId}
        groupPgpPublicKey={groupPgpPublicKey}
      />
    </View>
  );
};

export default FriendsChat;
