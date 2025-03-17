import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {IMessage} from 'react-native-gifted-chat';
import OpenPGP from 'react-native-fast-openpgp';
import Toast from 'react-native-toast-message';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {useFocusEffect} from '@react-navigation/native';

import {ChatProps, MessageFilters} from './chat.types';
import useCurrentUserProfile from 'hooks/current-user';
import {ChatMessage} from 'types/chat-message';
import {getUserPgpPrivateKey} from 'src/shared/utils/secure-storage';
import {decryptChatMessage, sortChatMessagesByTime} from './chat.api';

export const useChat = ({
  chatSocket,
  chatRoomId,
  groupPgpPublicKey,
}: ChatProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [areLoadingMessages, setAreLoadingMessages] = useState(true);

  const {data: currentUserProfile} = useCurrentUserProfile();

  const onSend = useCallback(
    async (messages: IMessage[]) => {
      try {
        const encryptedMessage = await OpenPGP.encrypt(
          messages[0].text,
          groupPgpPublicKey,
        );

        chatSocket.emit('sendMessage', {
          roomId: chatRoomId,
          text: encryptedMessage,
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to send message',
        });
      }
    },
    [chatRoomId, chatSocket, groupPgpPublicKey],
  );

  // need for proper KeyboardAvoidingView on Android
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        AvoidSoftInput.setAdjustResize();
        AvoidSoftInput.setEnabled(true);
      }
      return () => {
        if (Platform.OS === 'android') {
          AvoidSoftInput.setEnabled(false);
          AvoidSoftInput.setAdjustPan();
        }
      };
    }, []),
  );

  // listen WS messages
  useEffect(() => {
    (async () => {
      if (!currentUserProfile) throw new Error('User is not logged in');
      const {userId} = currentUserProfile;

      const userPgpPrivateKey = await getUserPgpPrivateKey(userId);
      if (!userPgpPrivateKey) throw new Error('Invalid decrypt data');

      chatSocket.on('messageSent', async (message: [ChatMessage]) => {
        // add messages from current room only
        if (message[0].roomId !== chatRoomId) return;

        try {
          const messageWithDecryptedText = await decryptChatMessage(
            userId,
            userPgpPrivateKey,
            message[0],
          );

          setMessages(previousMessages =>
            [...previousMessages, messageWithDecryptedText].sort(
              sortChatMessagesByTime,
            ),
          );
        } catch (error) {
          console.log('error:', error);
        }
      });

      const messageFilters: MessageFilters = {
        roomId: chatRoomId,
      };

      chatSocket.emit('findAllMessages', messageFilters);

      chatSocket.on('allMessages', async (messages: ChatMessage[]) => {
        const decryptPromises = messages.map(m =>
          decryptChatMessage(userId, userPgpPrivateKey, m),
        );

        const decryptedMessages = await Promise.allSettled(decryptPromises);

        const successDecryptedMessages = decryptedMessages
          .filter(
            (m): m is PromiseFulfilledResult<IMessage> =>
              m.status === 'fulfilled',
          )
          .map(m => m.value)
          .sort(sortChatMessagesByTime);

        setMessages(successDecryptedMessages);
        setAreLoadingMessages(false);
      });
    })();
  }, [chatSocket, currentUserProfile, chatRoomId]);

  return {messages, areLoadingMessages, onSend};
};
