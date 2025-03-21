import React, {FC} from 'react';
import {Button} from '@ui-kitten/components';

import styles from './create-trade.styles';
import {SelectRecipient} from '../select-recipient';
import {SelectTokens} from '../select-tokens';
import {ReviewOrder} from '../review-order';
import {SelectTokensAmount} from '../select-tokens-amount';
import {validateTokenColorSelect} from './create-trade.api';
import {WaitFinish} from '../wait-finish';
import {SignTrade} from '../sign-trade';
import {Finish} from '../finish';
import {useChat, useCreateTrade, useHandlers} from './create-trade.hooks';
import {OverlayLoader} from 'components/overlay-loader';
import {Chat} from 'components/chat';
import {TradeChatModal} from '../trade-chat-modal';

export const CreateTrade: FC = () => {
  const {tradeStatus, data} = useCreateTrade();

  const {
    chatSocket,
    chatRoomId,
    groupPgpPublicKey,
    isOpenChatModal,
    toggleChatModal,
  } = useChat();

  const {
    selectTokens,
    selectTokensAmount,
    submitTrade,
    acceptOffer,
    signTrade,
    exitHandler,
  } = useHandlers();

  const {
    isCheckingTradeStatus,
    isFindRecipient,
    isViewTokens,
    isViewTokenAmount,
    isReviewOffer,
    isSendingRequest,
    isWaitingAcceptance,
    isReviewingOfferedGems,
    isSigning,
    isWaitingFinish,
    isReviewResult,
  } = tradeStatus;

  const {userId, gemColor, receiverGemIds, currentTrade, resultTxHash} = data;

  return (
    <>
      {!!chatRoomId && !isReviewResult && (
        <Button
          size="small"
          style={styles.chatButton}
          onPress={toggleChatModal}>
          Open chat
        </Button>
      )}

      <TradeChatModal isOpen={isOpenChatModal} toggleOpen={toggleChatModal}>
        <Chat
          chatSocket={chatSocket}
          chatRoomId={chatRoomId}
          groupPgpPublicKey={groupPgpPublicKey}
        />
      </TradeChatModal>

      {isCheckingTradeStatus && <OverlayLoader />}

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
          user1GemIds={receiverGemIds}
          gemsAmount={receiverGemIds.length}
          isSubmitting={isSendingRequest}
          submitHandler={submitTrade}
        />
      )}

      {currentTrade && isReviewingOfferedGems && (
        <ReviewOrder
          user1GemIds={currentTrade.initiatorGemIds}
          user2GemIds={currentTrade.receiverGemIds}
          gemsAmount={currentTrade.receiverGemIds.length}
          isSubmitting={false}
          submitHandler={acceptOffer}
        />
      )}

      {currentTrade && isSigning && (
        <SignTrade
          userId={userId}
          tradeId={currentTrade.id}
          signTradeHandler={signTrade}
        />
      )}

      {isWaitingAcceptance && (
        <WaitFinish message="Waiting for recipient acceptance" />
      )}

      {(isSigning || isWaitingFinish) && (
        <WaitFinish message="Processing trade, please wait" />
      )}

      {resultTxHash && isReviewResult && (
        <Finish
          message="Trade has been successfully finished"
          txHash={resultTxHash}
          exitHandler={exitHandler}
        />
      )}

      {(isFindRecipient ||
        isViewTokens ||
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
