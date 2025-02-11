import React from 'react';
import {View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useStyleSheet} from '@ui-kitten/components';

import themedStyles from './quest-chat.styles';
import {QuestsStackParamList} from '../navigation/navigation.types';
import {Chat} from '../trade/components/chat';

const QuestChat = () => {
  const {
    params: {socket, chatRoomId, groupPgpPublicKey},
  } = useRoute<RouteProp<QuestsStackParamList, 'quest-chat'>>();

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

export default QuestChat;
