import Quest from 'types/quest';
import {JoinQuestData, LeaveQuestData} from './quest.types';
import api from 'configs/axios';
import {UserProfile} from 'types/user';

export const getQuestById = async (questId: number): Promise<Quest> =>
  (await api.get<Quest>(`/quest/${questId}`)).data;

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
