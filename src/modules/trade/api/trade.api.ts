import {isAxiosError} from 'axios';
import Toast from 'react-native-toast-message';

import api from 'configs/axios';
import {Trade, TradeStatus} from 'types/trade';
import {
  AcceptTradeData,
  InitializeTradeData,
  SignTradeData,
} from '../trade.types';
import {getTradeById} from 'src/shared/api/trade';
import {tradingActor} from './trading-machine';
import {Errors} from 'src/enums/errors';

export enum TradingMachinesIds {
  CREATE_TRADE = 'createTrade',
  ACCEPT_TRADE = 'acceptTrade',
}

export const initializeTrade = async (
  data: InitializeTradeData,
): Promise<Trade> => {
  try {
    return (await api.post<Trade>('reward/trade/initialize', data)).data;
  } catch (error) {
    let errorMessage = Errors.UNKNOWN;

    if (isAxiosError(error)) {
      errorMessage = error.response?.data.message;
    }

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: errorMessage,
    });
    throw error;
  }
};

// TODO delete ???
export const checkIfTradeAccepted = async (tradeId: number): Promise<void> => {
  const trade = await getTradeById(tradeId);
  if (trade.status !== TradeStatus.ACCEPTED)
    throw new Error('Trade is not accepted');
};

// TODO delete ???
export const checkIfTradeFinished = async (trade: Trade): Promise<void> => {
  if (trade.status !== TradeStatus.FINISHED)
    throw new Error('Trade is not finished');
};

// TODO delete ???
export const checkIfTradeSignedByInitiator = async (
  tradeId: number,
): Promise<void> => {
  const trade = await getTradeById(tradeId);
  if (trade.status !== TradeStatus.WAITING_SIGNATURE)
    throw new Error('Trade is not signed by initiator');
};

export const acceptTrade = async ({
  tradeId,
  ...data
}: AcceptTradeData): Promise<Trade> => {
  try {
    return (await api.post<Trade>(`reward/trade/${tradeId}/accept-trade`, data))
      .data;
  } catch (error) {
    let errorMessage = Errors.UNKNOWN;

    if (isAxiosError(error)) {
      errorMessage = error.response?.data.message;
    }

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: errorMessage,
    });
    throw error;
  }
};

export const signTradeByInitiator = async ({
  tradeId,
  ...data
}: SignTradeData): Promise<void> =>
  (await api.post<void>(`reward/trade/${tradeId}/sign-initiator`, data)).data;

export const signTradeByReceiver = async ({
  tradeId,
  ...data
}: SignTradeData): Promise<void> =>
  (await api.post<void>(`reward/trade/${tradeId}/sign-receiver`, data)).data;

export const completeTrade = async (tradeId: number): Promise<string> =>
  (await api.post<string>(`reward/trade/${tradeId}/complete`)).data;

export const createTradeHandler = () => tradingActor.send({type: 'offer'});
