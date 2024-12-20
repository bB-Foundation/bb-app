import api from 'configs/axios';

import {Trade} from 'types/trade';

export const getTradeById = async (tradeId: number) =>
  (await api.get<Trade>(`reward/trade/${tradeId}`)).data;
