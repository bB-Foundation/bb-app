import api from 'configs/axios';
import {GemMetadata} from 'types/gem';

export const swap = async ({txHash}: {txHash: string}): Promise<number> =>
  (await api.post<number>('reward/swap', {txHash})).data;

export const getGems = async (userId: number): Promise<GemMetadata[]> =>
  (await api.get<GemMetadata[]>(`/reward/gem/list/${userId}`)).data;
