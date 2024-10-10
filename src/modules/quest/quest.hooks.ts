import {useMemo} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {QuestsStackParamList} from '../navigation/navigation.types';
import {
  calculateDistanceFromQuestInKm,
  defineUserParticipateQuest,
  joinQuest,
  leaveQuest,
} from './quest.api';
import {JoinQuestData, LeaveQuestData} from './quest.types';
import {getApiOrUnknownErrorMessage} from 'src/shared/utils/errors';
import queryKeys from 'configs/query-keys';
import useCurrentUserProfile from 'hooks/current-user';
import Quest from 'types/quest';
import useGeoPosition from 'hooks/geo-position';
import {getQuestById} from 'src/shared/api/quests';

export const useQuestLogic = () => {
  const {
    params: {questId},
  } = useRoute<RouteProp<QuestsStackParamList, 'quest'>>();

  const {geoPosition} = useGeoPosition();

  const {data: quest} = useQuest(questId);

  const isUserParticipateQuest = useDefineUserParticipateQuest(quest);

  const distanceFromQuestInKm = calculateDistanceFromQuestInKm(
    geoPosition?.coords.latitude,
    geoPosition?.coords.longitude,
    quest,
  );

  return {quest, isUserParticipateQuest, distanceFromQuestInKm};
};

const useQuest = (questId: number) =>
  useQuery({
    queryKey: queryKeys.getQuestById(questId),
    queryFn: () => getQuestById(questId),
  });

const useDefineUserParticipateQuest = (quest: Quest | undefined) => {
  const {data: currentUserProfile} = useCurrentUserProfile();

  const isUserParticipateQuest = useMemo(() => {
    if (!quest?.users || !currentUserProfile) return;

    return defineUserParticipateQuest(quest, currentUserProfile);
  }, [quest, currentUserProfile]);

  return isUserParticipateQuest;
};

export const useButtonHandlers = () => {
  const queryClient = useQueryClient();

  const refetchCurrentQuestQuests = async (questId: number) =>
    queryClient.invalidateQueries({
      queryKey: queryKeys.getQuestById(questId),
    });

  const joinQuestHandler = async (data: JoinQuestData) => {
    try {
      await joinQuest(data);

      await refetchCurrentQuestQuests(data.questId);

      Toast.show({
        type: 'success',
        text1: 'Congratulations',
        text2: 'You have become a participant!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getApiOrUnknownErrorMessage(error),
      });
    }
  };

  const leaveQuestHandler = async (data: LeaveQuestData) => {
    try {
      await leaveQuest(data);

      await refetchCurrentQuestQuests(data.questId);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'You refused to participate in the quest',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getApiOrUnknownErrorMessage(error),
      });
    }
  };

  return {joinQuestHandler, leaveQuestHandler};
};
