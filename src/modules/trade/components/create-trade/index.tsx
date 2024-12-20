import React, {FC} from 'react';

import {SelectRecipient} from '../select-recipient';
import {SelectTokens} from '../select-tokens';
import {ReviewOrder} from '../review-order';
import {SelectTokensAmount} from '../select-tokens-amount';
import {validateTokenColorSelect} from './create-trade.api';
import {WaitFinish} from '../wait-finish';
import {SignTrade} from '../sign-trade';
import {useCreateTrade, useHandlers} from './create-trade.hooks';
import {Finish} from '../finish';
import {Button} from '@ui-kitten/components';

export const CreateTrade: FC = () => {
  const {tradeStatus, data} = useCreateTrade();

  const {
    selectTokens,
    selectTokensAmount,
    submitTrade,
    signTrade,
    exitHandler,
  } = useHandlers();

  const {
    isFindRecipient,
    isViewTokens,
    isViewTokenAmount,
    isReviewOffer,
    isSendingRequest,
    isWaitingAcceptance,
    isSigning,
    isWaitingFinish,
    isReviewResult,
  } = tradeStatus;

  const {userId, gemColor, receiverGemIds, currentTrade} = data;

  return (
    <>
      {isFindRecipient && <SelectRecipient />}

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
        />
      )}

      {gemColor && (isReviewOffer || isSendingRequest) && (
        <ReviewOrder
          gemColor={gemColor}
          isSubmitting={isSendingRequest}
          gemsAmount={receiverGemIds.length}
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

      {(isWaitingAcceptance || isSigning || isWaitingFinish) && (
        <WaitFinish message="Waiting for recipient acceptance" />
      )}

      {currentTrade && currentTrade.txHash && isReviewResult && (
        <Finish
          message="Trade has been successfully finished"
          txHash={currentTrade.txHash}
          exitHandler={exitHandler}
        />
      )}

      {(isFindRecipient ||
        isViewTokens ||
        isViewTokenAmount ||
        isReviewOffer) && (
        <Button onPress={exitHandler} appearance="ghost" status="basic">
          Exit
        </Button>
      )}
    </>
  );
};
