import React from 'react';
import {Button} from '@ui-kitten/components';

import styles from './accept-trade.styles';
import {SelectTokens} from '../select-tokens';
import {ReviewOrder} from '../review-order';
import {SelectTokensAmount} from '../select-tokens-amount';
import {WaitFinish} from '../wait-finish';
import {SignTrade} from '../sign-trade';
import {useAcceptTrade, useChat, useHandlers} from './accept-trade.hooks';
import {Finish} from '../finish';
import {OverlayLoader} from 'components/overlay-loader';

export const AcceptTrade = () => {
  const {tradeStatus, data} = useAcceptTrade();

  const {chatRoomId, openChatModal} = useChat();

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
    isCheckingTradeStatus,
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
      {!!chatRoomId && !isReviewResult && (
        <Button size="small" style={styles.chatButton} onPress={openChatModal}>
          Open chat
        </Button>
      )}

      {isCheckingTradeStatus && <OverlayLoader />}

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
          user1GemIds={receiverGemIds}
          user2GemIds={currentTrade.initiatorGemIds}
          submitHandler={submitTrade}
        />
      )}

      {isWaitingSign && (
        <WaitFinish message="Waiting for recipient acceptance" />
      )}

      {currentTrade && isSigning && (
        <SignTrade
          userId={userId}
          tradeId={currentTrade.id}
          signTradeHandler={signTrade}
        />
      )}

      {(isSigning || isCompleting) && (
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
