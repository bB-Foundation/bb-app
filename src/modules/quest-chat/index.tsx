import React from 'react';
import {View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useStyleSheet} from '@ui-kitten/components';

import themedStyles from './quest-chat.styles';
import {QuestsStackParamList} from '../navigation/navigation.types';
import {Chat} from '../../components/chat';
import {useChat} from './quest-chat.hooks';

const QuestChat = () => {
  const {params: routeParams} =
    useRoute<RouteProp<QuestsStackParamList, 'quest-chat'>>();
  const {chatRoomId} = routeParams;

  const {chatSocket, groupPgpPublicKey} = useChat({
    groupPublicKey: routeParams.groupPgpPublicKey,
  });

  const styles = useStyleSheet(themedStyles);

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
