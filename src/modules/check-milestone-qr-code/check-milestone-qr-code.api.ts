import api from 'configs/axios';

export const claimMilestoneReward = async (
  milestoneId: number,
): Promise<void> =>
  (await api.post<void>(`quest/milestone/claim-reward/${milestoneId}`)).data;
