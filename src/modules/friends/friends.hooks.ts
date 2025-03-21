import {useCallback, useEffect, useMemo, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {UserProfile} from 'types/user';
import {fetUserByBbId} from '../trade/components/select-recipient/select-recipient.api';
import {NavigationProp} from '../navigation/navigation.types';
import useCurrentUserProfile from 'hooks/current-user';
import {getUserPgpPrivateKey} from 'src/shared/utils/secure-storage';
import {ChatRoom, RoomType} from 'types/chat-room';
import {decryptChatRoomLastMessage} from './friends.api';
import useDebounce from 'hooks/debounce';
import {getChatSocket} from 'src/shared/api/sockets';

export const useUserSearch = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  const [data, setData] = useState<UserProfile[]>([]);

  // search user
  useEffect(() => {
    (async () => {
      if (!debouncedValue) return setData([]);

      try {
        const user = await fetUserByBbId(debouncedValue);
        setData([user]);
      } catch (error) {
        setData([]);
      }
    })();
  }, [debouncedValue]);

  const cleanSearch = () => {
    setValue('');
    setData([]);
  };

  return {
    data,
    value,
    onChangeText: setValue,
    cleanSearch,
  };
};

export const useChat = () => {
  const navigation = useNavigation<NavigationProp>();

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const [areLoadingRooms, setAreLoadingRooms] = useState(true);

  const {data: currentUserProfile} = useCurrentUserProfile();

  const chatSocket = useMemo(() => getChatSocket(), []);

  const openRoom = useCallback(
    (chatRoomId: number, groupPgpPublicKey: string) => {
      navigation.navigate('friends-chat', {
        chatRoomId,
        groupPgpPublicKey,
      });
    },
    [navigation],
  );

  const openRoomHandler = ({id, groupPgpPublicKey}: ChatRoom) => {
    openRoom(id, groupPgpPublicKey);
  };

  const onUserPressHandler = (inviteeUserId: number) => {
    // open room if already exists
    for (const room of chatRooms) {
      if (room.participants.some(p => p.id === inviteeUserId)) {
        openRoom(room.id, room.groupPgpPublicKey);
        return;
      }
    }

    chatSocket.emit('createRoom', {
      type: RoomType.DIRECT,
      participants: [inviteeUserId],
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (!chatSocket || !currentUserProfile) return;
      const {userId} = currentUserProfile;

      // load chat rooms
      setAreLoadingRooms(true);
      chatSocket.emit('getUserRooms', {type: RoomType.DIRECT});

      chatSocket.on('roomDetailsFetched', async (rooms: ChatRoom[]) => {
        if (rooms[0].type !== RoomType.DIRECT) return;

        const userPgpPrivateKey = await getUserPgpPrivateKey(userId);
        if (!userPgpPrivateKey) throw new Error('Invalid decrypt data');

        const roomsWithEncryptedLastMessage = await decryptChatRoomLastMessage(
          userId,
          userPgpPrivateKey,
          rooms,
        );

        setChatRooms(roomsWithEncryptedLastMessage);
        setAreLoadingRooms(false);
      });

      chatSocket.on('roomCreated', (room: ChatRoom) => {
        if (room.type !== RoomType.DIRECT) return;

        setChatRooms(p => [...p, room]);

        if (room.createdBy === userId) {
          openRoom(room.id, room.groupPgpPublicKey);
        }
      });

      // update rooms last messages on message sent
      chatSocket.on('messageSent', async () => {
        chatSocket.emit('getUserRooms', {type: RoomType.DIRECT});
      });

      return () => {
        chatSocket.removeAllListeners();
      };
    }, [chatSocket, currentUserProfile, openRoom]),
  );

  return {areLoadingRooms, chatRooms, onUserPressHandler, openRoomHandler};
};

export const useLayout = () => {
  const {top} = useSafeAreaInsets();

  const mainContainerMarginTop = top ? 0 : 16;

  return {mainContainerMarginTop};
};
