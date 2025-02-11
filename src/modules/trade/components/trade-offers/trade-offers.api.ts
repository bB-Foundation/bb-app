import api from 'configs/axios';
import {Trade, TradeStatus} from 'types/trade';

export const getUserTradeOffers = async ({
  userId,
}: {
  userId: number;
}): Promise<Trade[]> =>
  (await api.get<Trade[]>(`reward/trades/user/${userId}`)).data.filter(
    t =>
      (t.initiatorId === userId || t.receiverId === userId) &&
      t.status !== TradeStatus.ON_CHAIN &&
      t.status !== TradeStatus.FINISHED &&
      t.status !== TradeStatus.CANCELLED,
  );
