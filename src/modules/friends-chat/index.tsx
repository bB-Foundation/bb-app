import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {useStyleSheet} from '@ui-kitten/components';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';

import {Chat} from '../../components/chat';
import themedStyles from './friends-chat.styles';
import {getChatSocket} from 'src/shared/api/sockets';
import {ProfileStackParamList} from '../navigation/navigation.types';

const FriendsChat = () => {
  const {
    params: {chatRoomId, groupPgpPublicKey},
  } = useRoute<RouteProp<ProfileStackParamList, 'friends-chat'>>();

  const chatSocket = useMemo(() => getChatSocket(), []);

  const styles = useStyleSheet(themedStyles);

  useFocusEffect(
    useCallback(() => {
      return () => {
        chatSocket.removeAllListeners();
      };
    }, [chatSocket]),
  );

  return (
    <View style={styles.container}>
      <Chat
        chatSocket={chatSocket}
        chatRoomId={chatRoomId}
        groupPgpPublicKey={groupPgpPublicKey}
      />
    </View>
  );
};

export default FriendsChat;
