import {useEffect, useMemo, useState} from 'react';
import {useSelector} from '@xstate/react';
import Toast from 'react-native-toast-message';

import {
  tokenColorRecipientSelectValidation,
  validateGemsAmount,
} from './accept-trade.api';
import {GemColor} from 'types/gem';
import {tradingActor} from '../../api/trading-machine';
import {
  findTradeChatRoomByTradeId,
  generateTradeRoomName,
  TradeErrors,
  TradingEventType,
  TradingMachinesIds,
} from '../../api/trade.api';
import {AcceptTradeActor} from '../../api/accept-trade-machine';
import {ChatRoom, RoomType} from 'types/chat-room';
import {getTradeById} from 'src/shared/api/trade';
import {Trade, TradeStatus} from 'types/trade';
import {getChatSocket, getTradingSocket} from 'src/shared/api/sockets';

export const useAcceptTrade = () => {
  const acceptTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.ACCEPT_TRADE] as AcceptTradeActor,
  );

  const {userId, gemColor, currentTrade, receiverGemIds, chatRoomId} =
    useSelector(acceptTradeActor, snapshot => snapshot.context);

  const value = useSelector(acceptTradeActor, snapshot => snapshot.value);
  console.log('🚀 ~ receiver trade status: ', value);

  const isCheckingTradeStatus = useSelector(acceptTradeActor, snapshot =>
    snapshot.matches('checkingTradeStatus'),
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

  const tradingSocket = useMemo(() => getTradingSocket(), []);
  const chatSocket = useMemo(() => getChatSocket(), []);

  // on trade enter
  useEffect(() => {
    (async () => {
      try {
        if (!isCheckingTradeStatus) return;

        const trade = await getTradeById(currentTrade.id);

        switch (trade.status) {
          case TradeStatus.PENDING:
            acceptTradeActor.send({type: 'setViewTokens'});
            break;

          case TradeStatus.ACCEPTED:
            acceptTradeActor.send({type: 'setWaitingSign'});
            break;

          case TradeStatus.WAITING_SIGNATURE:
            acceptTradeActor.send({type: 'setSigning'});
            break;

          case TradeStatus.SIGNED:
            acceptTradeActor.send({type: 'setCompleting'});
            break;

          default:
            break;
        }
      } catch (error) {
        acceptTradeActor.send({type: 'exit'});
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: TradeErrors.LOAD_TRADE,
        });
      }
    })();
  }, [isCheckingTradeStatus, currentTrade.id, acceptTradeActor]);

  // create a chat room on trade start or use an existing one
  useEffect(() => {
    if (chatRoomId) return;

    chatSocket.emit('getUserRooms', {type: RoomType.TRADE});

    chatSocket.once('roomDetailsFetched', (rooms: ChatRoom[]) => {
      const existingChatRoom = findTradeChatRoomByTradeId(
        currentTrade.id,
        rooms,
      );

      if (existingChatRoom) {
        const {id: chatRoomId, groupPgpPublicKey} = existingChatRoom;
        acceptTradeActor.send({
          type: 'setChatData',
          chatRoomId,
          groupPgpPublicKey,
        });
      } else {
        chatSocket.emit('createRoom', {
          name: generateTradeRoomName(currentTrade.id),
          type: RoomType.TRADE,
          participants: [currentTrade.initiatorId],
        });
      }
    });

    chatSocket.on('roomCreated', ({id, name, groupPgpPublicKey}: ChatRoom) => {
      if (name !== generateTradeRoomName(currentTrade.id)) return;

      acceptTradeActor.send({
        type: 'setChatData',
        chatRoomId: id,
        groupPgpPublicKey,
      });
    });
  }, [chatSocket, currentTrade, chatRoomId, acceptTradeActor]);

  // sign trade after initiator signed
  useEffect(() => {
    tradingSocket.on(TradingEventType.TradeInitiatorSigned, (trade: Trade) => {
      if (trade.id !== currentTrade.id) return;

      acceptTradeActor.send({type: 'startSigning'});
    });
  }, [acceptTradeActor, tradingSocket, currentTrade.id]);

  // delete chat room after success trade
  useEffect(() => {
    if (!isReviewResult) return;

    chatSocket.emit('deleteRoom', {roomId: chatRoomId});
  }, [isReviewResult, chatRoomId, chatSocket]);

  // remove socket listeners
  useEffect(() => {
    return () => {
      chatSocket.removeAllListeners();
      tradingSocket.removeAllListeners();
    };
  }, [chatSocket, tradingSocket]);

  return {
    tradeStatus: {
      isCheckingTradeStatus,
      isViewTokens,
      isViewTokenAmount,
      isReviewOffer,
      isSendingRequest,
      isWaitingSign,
      isSigning,
      isCompleting,
      isReviewResult,
    },
    data: {
      userId,
      gemColor,
      currentTrade,
      receiverGemIds,
    },
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

export const useChat = () => {
  const [isOpenChatModal, setIsOpenChatModal] = useState(false);

  const acceptTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.ACCEPT_TRADE] as AcceptTradeActor,
  );

  const {chatRoomId, groupPgpPublicKey} = useSelector(
    acceptTradeActor,
    snapshot => snapshot.context,
  );

  const chatSocket = useMemo(() => getChatSocket(), []);

  const toggleChatModal = () => setIsOpenChatModal(p => !p);

  return {
    chatSocket,
    chatRoomId,
    groupPgpPublicKey,
    isOpenChatModal,
    toggleChatModal,
  };
};
