import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {useStyleSheet} from '@ui-kitten/components';

import {Chat} from '../../components/chat';
import themedStyles from './trade-chat.styles';
import {getChatSocket} from 'src/shared/api/sockets';
import {TradeStackParamList} from '../navigation/navigation.types';

export const TradeChat = () => {
  const {
    params: {chatRoomId, groupPgpPublicKey},
  } = useRoute<RouteProp<TradeStackParamList, 'chat'>>();

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
