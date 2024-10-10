import Quest from 'types/quest';
import {JoinQuestData, LeaveQuestData} from './quest.types';
import api from 'configs/axios';
import {UserProfile} from 'types/user';
import {getDistanceBetweenPointsInKm} from 'src/shared/utils/location';

export const joinQuest = async ({
  questId,
  txHash,
}: JoinQuestData): Promise<void> =>
  (await api.post<void>(`/quest/assign/${questId}`, {txHash})).data;

export const leaveQuest = async ({
  questId,
  txHash,
}: LeaveQuestData): Promise<void> =>
  (await api.post<void>(`/quest/unassign/${questId}`, {txHash})).data;

export const defineUserParticipateQuest = (
  quest: Quest,
  currentUserProfile: UserProfile,
): boolean => !!quest.users.find(u => u.email === currentUserProfile.email);

export const calculateDistanceFromQuestInKm = (
  userLatitude: number | undefined,
  userLongitude: number | undefined,
  quest: Quest | undefined,
): number | undefined => {
  if (!userLatitude || !userLongitude || !quest) return;

  return getDistanceBetweenPointsInKm(
    userLatitude,
    userLongitude,
    +quest.latitude,
    +quest.longitude,
  );
};
