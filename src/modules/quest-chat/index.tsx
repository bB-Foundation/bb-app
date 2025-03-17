import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {useStyleSheet} from '@ui-kitten/components';

import themedStyles from './quest-chat.styles';
import {QuestsStackParamList} from '../navigation/navigation.types';
import {Chat} from '../../components/chat';
import {getChatSocket} from 'src/shared/api/sockets';

const QuestChat = () => {
  const {
    params: {chatRoomId, groupPgpPublicKey},
  } = useRoute<RouteProp<QuestsStackParamList, 'quest-chat'>>();

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

export default QuestChat;
