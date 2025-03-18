import {useCallback, useMemo, useState} from 'react';
import {InteractionManager} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {NavigationProp} from '../navigation/navigation.types';
import {getChatSocket} from 'src/shared/api/sockets';
import {ChatRoom} from 'types/chat-room';

export const useChat = ({groupPublicKey}: {groupPublicKey: string}) => {
  const [groupPgpPublicKey, setGroupPgpPublicKey] = useState(
    () => groupPublicKey,
  );

  const chatSocket = useMemo(() => getChatSocket(), []);

  const navigation = useNavigation<NavigationProp>();

  // listen socket events
  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        const onGetRoom = ({participants, groupPgpPublicKey}: ChatRoom) => {
          navigation.setOptions({
            title: `Chat members: ${participants.length}`,
          });

          setGroupPgpPublicKey(groupPgpPublicKey);
        };

        chatSocket.on('roomUpdated', (chatRoom: ChatRoom) =>
          onGetRoom(chatRoom),
        );
      });

      return () => task.cancel();
    }, [chatSocket, navigation]),
  );

  // clear socket listeners
  useFocusEffect(
    useCallback(() => {
      return () => {
        chatSocket.removeAllListeners();
      };
    }, [chatSocket]),
  );

  return {chatSocket, groupPgpPublicKey};
};
