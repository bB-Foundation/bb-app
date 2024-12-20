import api from 'configs/axios';
import {LoomisFilters} from 'hooks/loomis/loomis.types';
import {Loomi} from 'types/loomi';

export const getLoomis = async ({userId}: LoomisFilters): Promise<Loomi[]> =>
  (await api.get<Loomi[]>(`reward/loomi/list/${userId}`)).data;
