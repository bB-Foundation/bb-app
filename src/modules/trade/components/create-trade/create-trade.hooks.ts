import {useSelector} from '@xstate/react';

import {GemColor} from 'types/gem';
import {tradingActor} from '../../api/trading-machine';
import {TradingMachinesIds} from '../../api/trade.api';
import {CreateTradeActor} from '../../api/create-trade-machine';

export const useCreateTrade = () => {
  const createTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.CREATE_TRADE] as CreateTradeActor,
  );

  const {userId, gemColor, receiverGemIds, currentTrade} = useSelector(
    createTradeActor,
    snapshot => snapshot.context,
  );

  const value = useSelector(createTradeActor, snapshot => snapshot.value);
  console.log('🚀 ~ useCreateTrade ~ value:', value);

  const isFindRecipient = useSelector(createTradeActor, snapshot =>
    snapshot.matches('findRecipient'),
  );

  const isViewTokens = useSelector(createTradeActor, snapshot =>
    snapshot.matches('viewTokens'),
  );

  const isViewTokenAmount = useSelector(createTradeActor, snapshot =>
    snapshot.matches('viewTokenAmount'),
  );

  const isReviewOffer = useSelector(createTradeActor, snapshot =>
    snapshot.matches('reviewOffer'),
  );

  const isSendingRequest = useSelector(createTradeActor, snapshot =>
    snapshot.matches('sendingRequest'),
  );

  const isWaitingAcceptance = useSelector(createTradeActor, snapshot =>
    snapshot.matches('waitingAcceptance'),
  );

  const isSigning = useSelector(createTradeActor, snapshot =>
    snapshot.matches('signing'),
  );

  const isWaitingFinish = useSelector(createTradeActor, snapshot =>
    snapshot.matches('waitingFinish'),
  );

  const isReviewResult = useSelector(createTradeActor, snapshot =>
    snapshot.matches('reviewResult'),
  );

  return {
    tradeStatus: {
      isFindRecipient,
      isViewTokens,
      isViewTokenAmount,
      isReviewOffer,
      isSendingRequest,
      isWaitingAcceptance,
      isSigning,
      isWaitingFinish,
      isReviewResult,
    },
    data: {
      userId,
      gemColor,
      receiverGemIds,
      currentTrade,
    },
  };
};

export const useHandlers = () => {
  const createTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.CREATE_TRADE] as CreateTradeActor,
  );

  const selectTokens = (gemColor: GemColor) =>
    createTradeActor.send({type: 'selectGemColor', gemColor});

  const selectTokensAmount = (receiverGemIds: number[]) =>
    createTradeActor.send({type: 'selectTokens', receiverGemIds});

  const submitTrade = () => createTradeActor.send({type: 'sendRequest'});

  const signTrade = (signature: string) => {
    createTradeActor.send({type: 'sign', signature});
  };

  const exitHandler = () => {
    createTradeActor.send({type: 'exit'});
  };

  return {
    selectTokens,
    selectTokensAmount,
    submitTrade,
    signTrade,
    exitHandler,
  };
};
