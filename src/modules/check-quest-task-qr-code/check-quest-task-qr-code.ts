import api from 'configs/axios';

export const claimQuestTaskReward = async (
  questTaskId: number,
): Promise<number> =>
  (await api.post<number>(`quest/milestone/claim-reward/${questTaskId}`)).data;
