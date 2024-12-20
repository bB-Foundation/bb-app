import {useSelector} from '@xstate/react';

import {
  tokenColorRecipientSelectValidation,
  validateGemsAmount,
} from './accept-trade.api';
import {GemColor} from 'types/gem';
import {tradingActor} from '../../api/trading-machine';
import {TradingMachinesIds} from '../../api/trade.api';
import {AcceptTradeActor} from '../../api/accept-trade-machine';

export const useAcceptTrade = () => {
  const acceptTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.ACCEPT_TRADE] as AcceptTradeActor,
  );

  const {userId, gemColor, currentTrade, receiverGemIds} = useSelector(
    acceptTradeActor,
    snapshot => snapshot.context,
  );

  const isViewTokens = useSelector(acceptTradeActor, snapshot =>
    snapshot.matches('viewTokens'),
  );

  const isViewTokenAmount = useSelector(acceptTradeActor, snapshot =>
    snapshot.matches('viewTokenAmount'),
  );

  const isReviewOffer = useSelector(acceptTradeActor, snapshot =>
    snapshot.matches('reviewOffer'),
  );

  const isSendingRequest = useSelector(acceptTradeActor, snapshot =>
    snapshot.matches('sendingRequest'),
  );

  const isWaitingSign = useSelector(acceptTradeActor, snapshot =>
    snapshot.matches('waitingSign'),
  );

  const isSigning = useSelector(acceptTradeActor, snapshot =>
    snapshot.matches('signing'),
  );

  const isCompleting = useSelector(acceptTradeActor, snapshot =>
    snapshot.matches('completing'),
  );

  const isReviewResult = useSelector(acceptTradeActor, snapshot =>
    snapshot.matches('reviewResult'),
  );

  return {
    tradeStatus: {
      isViewTokens,
      isViewTokenAmount,
      isReviewOffer,
      isSendingRequest,
      isWaitingSign,
      isSigning,
      isCompleting,
      isReviewResult,
    },
    data: {userId, gemColor, currentTrade, receiverGemIds},
  };
};

export const useHandlers = () => {
  const acceptTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.ACCEPT_TRADE] as AcceptTradeActor,
  );

  const {currentTrade} = useSelector(
    acceptTradeActor,
    snapshot => snapshot.context,
  );

  const validateTokenColorSelect = async (
    receiverGemsAmount: number,
    selectedGemsColor: GemColor,
  ) => {
    return tokenColorRecipientSelectValidation(
      currentTrade,
      receiverGemsAmount,
      selectedGemsColor,
    );
  };

  const submitGemsAmountValidator = (gemsAmount: number) => {
    validateGemsAmount(gemsAmount, currentTrade.initiatorGemIds.length);
  };

  const selectTokens = (gemColor: GemColor) =>
    acceptTradeActor.send({type: 'selectGemColor', gemColor});

  const selectTokensAmount = (receiverGemIds: number[]) =>
    acceptTradeActor.send({type: 'selectTokens', receiverGemIds});

  const submitTrade = () => acceptTradeActor.send({type: 'sendRequest'});

  const signTrade = (signature: string) => {
    acceptTradeActor.send({type: 'sign', signature});
  };

  const exitHandler = () => acceptTradeActor.send({type: 'exit'});

  return {
    validateTokenColorSelect,
    submitGemsAmountValidator,
    selectTokens,
    selectTokensAmount,
    submitTrade,
    signTrade,
    exitHandler,
  };
};
