import {Dictionary} from 'lodash';

import api from 'configs/axios';
import {GemMetadata} from 'types/gem';

export const swap = async ({txHash}: {txHash: string}): Promise<number> =>
  (await api.post<number>('reward/swap', {txHash})).data;

export const getGemTokenIdOfEachColor = (
  stackedGems: Dictionary<GemMetadata[]>,
): number[] => Object.values(stackedGems).map(g => g[0].tokenId);
