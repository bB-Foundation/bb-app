import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {useSelector} from '@xstate/react';
import {io, Socket} from 'socket.io-client';

import {
  NavigationProp,
  QuestsStackParamList,
} from '../navigation/navigation.types';
import {
  calculateDistanceFromQuestInKm,
  defineUserParticipateQuest,
  joinQuest,
  toggleQuestParticipantsActor,
} from './quest.api';
import queryKeys from 'configs/query-keys';
import useCurrentUserProfile from 'hooks/current-user';
import Quest from 'types/quest';
import useGeoPosition from 'hooks/geo-position';
import {getQuestById} from 'src/shared/api/quests';
import {useWebViewMessage} from 'react-native-react-bridge';
import {
  isErrorMessage,
  WebAppEvents,
} from '../../components/web-app/web-app.api';
import {
  getJwtAccessToken,
  getUserAccountAddress,
  getUserPrivateKey,
} from 'src/shared/utils/secure-storage';
import {Errors} from 'src/enums/errors';
import {JoinQuestEvent} from 'components/web-app/web-app.types';
import {ChatRoom} from 'types/chat-room';

export const useQuestLogic = () => {
  const {
    params: {questId},
  } = useRoute<RouteProp<QuestsStackParamList, 'quest'>>();

  const {geoPosition} = useGeoPosition();

  const {data: quest} = useQuest(questId);

  const queryClient = useQueryClient();

  const isUserParticipateQuest = useDefineUserParticipateQuest(quest);

  const distanceFromQuestInKm = calculateDistanceFromQuestInKm(
    geoPosition?.coords.latitude,
    geoPosition?.coords.longitude,
    quest,
  );

  const {data: currentUserProfile} = useCurrentUserProfile();

  const isSubmitJoin = useSelector(toggleQuestParticipantsActor, snapshot =>
    snapshot.matches('submitJoin'),
  );

  const isSubmitLeave = useSelector(toggleQuestParticipantsActor, snapshot =>
    snapshot.matches('submitLeave'),
  );

  const isJoinQuestError = useSelector(toggleQuestParticipantsActor, snapshot =>
    snapshot.matches({submitJoin: 'error'}),
  );

  const isLeaveQuestError = useSelector(
    toggleQuestParticipantsActor,
    snapshot => snapshot.matches({submitLeave: 'error'}),
  );

  const {
    ref: webBrowserRef,
    onMessage: onWebBrowserMessage,
    emit: emitToWebBrowser,
  } = useWebViewMessage(async message => {
    console.log('🚀 ~ useQuestLogic ~ message:', message);

    switch (message.type) {
      case WebAppEvents.JOIN_QUEST_RESULT: {
        if (isErrorMessage(message)) {
          return toggleQuestParticipantsActor.send({type: 'reject'});
        }

        const {txHash} = message.data as {txHash: string};
        if (!txHash || !quest) {
          return toggleQuestParticipantsActor.send({type: 'reject'});
        }

        toggleQuestParticipantsActor.send({type: 'done'});

        try {
          await joinQuest({questId: quest.id, txHash});

          await queryClient.invalidateQueries({
            queryKey: queryKeys.getQuestById(quest.id),
          });

          toggleQuestParticipantsActor.send({type: 'done'});

          Toast.show({
            type: 'success',
            text1: 'Congratulations',
            text2: 'You have become a participant!',
          });
        } catch (error) {
          toggleQuestParticipantsActor.send({type: 'reject'});
        }
      }
    }
  });

  // set working state of state machine
  useEffect(() => {
    if (isUserParticipateQuest === undefined) return;

    toggleQuestParticipantsActor.send({
      type: isUserParticipateQuest
        ? 'setIsParticipient'
        : 'setIsNotParticipient',
    });
  }, [isUserParticipateQuest]);

  // start join quest
  useEffect(() => {
    if (!quest || !isSubmitJoin) return;

    (async () => {
      try {
        if (!currentUserProfile) throw new Error('No current user profile');

        const {userId} = currentUserProfile;
        const [privateKey, accountAddress] = await Promise.all([
          getUserPrivateKey(userId),
          getUserAccountAddress(userId),
        ]);

        if (!privateKey || !accountAddress || !quest.contractAddress)
          throw new Error('Inconsistent JoinQuestEvent data');

        const event: JoinQuestEvent = {
          type: WebAppEvents.JOIN_QUEST,
          data: {
            questAddress: quest.contractAddress,
            accountAddress,
            privateKey,
          },
        };
        emitToWebBrowser(event);
      } catch (error) {
        toggleQuestParticipantsActor.send({type: 'reject'});
      }
    })();
  }, [quest, isSubmitJoin, currentUserProfile, emitToWebBrowser]);

  // show error messages
  useEffect(() => {
    if (isJoinQuestError || isLeaveQuestError) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: Errors.UNKNOWN,
      });
    }
  }, [isJoinQuestError, isLeaveQuestError]);

  // reset state machine on screen blur
  useFocusEffect(
    useCallback(() => {
      return () => {
        toggleQuestParticipantsActor.send({type: 'reset'});
      };
    }, []),
  );

  return {
    quest,
    isUserParticipateQuest,
    distanceFromQuestInKm,
    webComponentData: {webBrowserRef, onWebBrowserMessage},
    isSubmittingQuest: isSubmitJoin || isSubmitLeave,
  };
};

const useQuest = (questId: number) =>
  useQuery({
    queryKey: queryKeys.getQuestById(questId),
    queryFn: () => getQuestById(questId),
  });

const useDefineUserParticipateQuest = (quest: Quest | undefined) => {
  const {data: currentUserProfile} = useCurrentUserProfile();

  const isUserParticipateQuest = useMemo(() => {
    if (!quest || !currentUserProfile) return;

    return defineUserParticipateQuest(quest, currentUserProfile);
  }, [quest, currentUserProfile]);

  return isUserParticipateQuest;
};

export const useButtonHandlers = () => {
  const joinQuestHandler = async () => {
    toggleQuestParticipantsActor.send({type: 'toggle'});
  };

  const leaveQuestHandler = async () => {
    toggleQuestParticipantsActor.send({type: 'toggle'});
  };

  return {
    joinQuestHandler,
    leaveQuestHandler,
  };
};

export const useChat = () => {
  const navigation = useNavigation<NavigationProp>();

  const [socket, setSocket] = useState<Socket>();

  const {data: currentUserProfile} = useCurrentUserProfile();

  const openChat = (quest: Quest) => {
    if (!currentUserProfile) throw new Error('user is not defined');
    if (!socket) throw new Error('socket is not defined');

    const {teamName} = currentUserProfile;

    const groupQuestRoom = quest.rooms.find(r => r.name === teamName);
    if (!groupQuestRoom) return;

    socket.emit('joinToGroupChatRoom', {roomId: groupQuestRoom.id});
    socket.emit('getRoomDetails', {roomId: groupQuestRoom.id});
  };

  // initialize chat socket
  useEffect(() => {
    (async () => {
      const accessToken = await getJwtAccessToken();
      if (!accessToken) throw new Error();

      const socket = io(
        `${process.env.BACKEND_API_URL}:${process.env.BACKEND_WS_TRADE_CHAT_PORT}`,
        {extraHeaders: {authorization: 'Bearer ' + accessToken}},
      );

      const openChatRoom = (
        chatRoomId: number,
        groupPgpPublicKey: string,
        chatMembersAmount: number,
      ) => {
        navigation.navigate('quest-chat', {
          socket,
          chatRoomId,
          groupPgpPublicKey,
          title: `Chat members: ${chatMembersAmount}`,
        });
      };

      socket.on(
        'roomDetailsFetched',
        ({id, groupPgpPublicKey, participants}: ChatRoom) =>
          openChatRoom(id, groupPgpPublicKey, participants.length),
      );

      socket.on(
        'roomUpdated',
        ({id, groupPgpPublicKey, participants}: ChatRoom) =>
          openChatRoom(id, groupPgpPublicKey, participants.length),
      );

      setSocket(socket);
    })();
  }, [navigation]);

  return {openChat};
};
