import React from 'react';

import {SelectTokens} from '../select-tokens';
import {ReviewOrder} from '../review-order';
import {SelectTokensAmount} from '../select-tokens-amount';
import {WaitFinish} from '../wait-finish';
import {SignTrade} from '../sign-trade';
import {useAcceptTrade, useHandlers} from './accept-trade.hooks';
import {Finish} from '../finish';
import {Button} from '@ui-kitten/components';

export const AcceptTrade = () => {
  const {tradeStatus, data} = useAcceptTrade();

  const {
    validateTokenColorSelect,
    submitGemsAmountValidator,
    selectTokens,
    selectTokensAmount,
    submitTrade,
    signTrade,
    exitHandler,
  } = useHandlers();

  const {
    isViewTokens,
    isViewTokenAmount,
    isReviewOffer,
    isSendingRequest,
    isWaitingSign,
    isSigning,
    isCompleting,
    isReviewResult,
  } = tradeStatus;

  const {userId, gemColor, currentTrade, receiverGemIds} = data;

  return (
    <>
      {isViewTokens && (
        <SelectTokens
          userId={userId}
          submitHandler={selectTokens}
          submitValidator={validateTokenColorSelect}
        />
      )}

      {isViewTokenAmount && gemColor && (
        <SelectTokensAmount
          userId={userId}
          gemColor={gemColor}
          submitHandler={selectTokensAmount}
          submitValidator={submitGemsAmountValidator}
        />
      )}

      {gemColor && (isReviewOffer || isSendingRequest) && (
        <ReviewOrder
          isSubmitting={isSendingRequest}
          gemsAmount={receiverGemIds.length}
          gemColor={gemColor}
          submitHandler={submitTrade}
        />
      )}

      {currentTrade && isSigning && (
        <SignTrade
          userId={userId}
          tradeId={currentTrade.id}
          signTradeHandler={signTrade}
        />
      )}

      {(isWaitingSign || isSigning || isCompleting) && (
        <WaitFinish message="Processing trade, please wait" />
      )}

      {currentTrade.txHash && isReviewResult && (
        <Finish
          message="Trade has been successfully finished"
          txHash={currentTrade.txHash}
          exitHandler={exitHandler}
        />
      )}

      {(isViewTokens ||
        isViewTokenAmount ||
        isReviewOffer ||
        isSendingRequest) && (
        <Button
          onPress={exitHandler}
          disabled={isSendingRequest}
          appearance="ghost"
          status="basic">
          Exit
        </Button>
      )}
    </>
  );
};
