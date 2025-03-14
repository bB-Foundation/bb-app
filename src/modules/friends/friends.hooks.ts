import {useCallback, useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {UserProfile} from 'types/user';
import {fetUserByBbId} from '../trade/components/select-recipient/select-recipient.api';
import {NavigationProp} from '../navigation/navigation.types';
import useCurrentUserProfile from 'hooks/current-user';
import {
  getJwtAccessToken,
  getUserPgpPrivateKey,
} from 'src/shared/utils/secure-storage';
import {ChatRoom, RoomType} from 'types/chat-room';
import {decryptChatRoomLastMessage} from './friends.api';
import useDebounce from 'hooks/debounce';

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

  const [socket, setSocket] = useState<Socket>();

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const [areLoadingRooms, setAreLoadingRooms] = useState(true);

  const {data: currentUserProfile} = useCurrentUserProfile();

  const openRoom = useCallback(
    (socket: Socket, chatRoomId: number, groupPgpPublicKey: string) => {
      navigation.navigate('friends-chat', {
        socket,
        chatRoomId,
        groupPgpPublicKey,
      });
    },
    [navigation],
  );

  const openRoomHandler = ({id, groupPgpPublicKey}: ChatRoom) => {
    if (!socket) throw new Error('socket is not defined');
    openRoom(socket, id, groupPgpPublicKey);
  };

  const onUserPressHandler = (inviteeUserId: number) => {
    if (!socket) throw new Error('socket is not defined');

    // open room if already exists
    for (const room of chatRooms) {
      if (room.participants.some(p => p.id === inviteeUserId)) {
        openRoom(socket, room.id, room.groupPgpPublicKey);
        return;
      }
    }

    socket.emit('createRoom', {
      type: RoomType.DIRECT,
      participants: [inviteeUserId],
    });
  };

  // initialize chat socket
  useEffect(() => {
    (async () => {
      if (!currentUserProfile) return;
      const {userId} = currentUserProfile;

      const accessToken = await getJwtAccessToken();
      if (!accessToken) throw new Error();

      const socket = io(
        `${process.env.BACKEND_API_URL}:${process.env.BACKEND_WS_TRADE_CHAT_PORT}`,
        {extraHeaders: {authorization: 'Bearer ' + accessToken}},
      );

      socket.on('roomDetailsFetched', async (rooms: ChatRoom[]) => {
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

      socket.on('roomCreated', (room: ChatRoom) => {
        setChatRooms(p => [...p, room]);

        if (room.createdBy === userId) {
          openRoom(socket, room.id, room.groupPgpPublicKey);
        }
      });

      // update last messages on message sent
      socket.on('messageSent', async () => {
        socket.emit('getUserRooms', {type: RoomType.DIRECT});
      });

      setSocket(socket);
    })();
  }, [navigation, currentUserProfile, openRoom]);

  // load chat rooms
  useFocusEffect(
    useCallback(() => {
      if (!socket) return;

      setAreLoadingRooms(true);
      socket.emit('getUserRooms', {type: RoomType.DIRECT});
    }, [socket]),
  );

  return {areLoadingRooms, chatRooms, onUserPressHandler, openRoomHandler};
};

export const useLayout = () => {
  const {top} = useSafeAreaInsets();

  const mainContainerMarginTop = top ? 0 : 16;

  return {mainContainerMarginTop};
};
