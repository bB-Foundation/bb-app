import api from 'configs/axios';

export const claimQuestTaskReward = async ({
  taskId,
  txHash,
}: {
  taskId: number;
  txHash: string;
}): Promise<number> =>
  (await api.post<number>(`quest/task/claim-reward/${taskId}`, {txHash})).data;
