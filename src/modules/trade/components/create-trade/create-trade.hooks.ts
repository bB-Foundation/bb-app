import {useEffect, useMemo, useState} from 'react';
import {useSelector} from '@xstate/react';
import Toast from 'react-native-toast-message';

import {GemColor} from 'types/gem';
import {tradingActor} from '../../api/trading-machine';
import {
  findTradeChatRoomByTradeId,
  generateTradeRoomName,
  TradeErrors,
  TradingEventType,
  TradingMachinesIds,
} from '../../api/trade.api';
import {CreateTradeActor} from '../../api/create-trade-machine';
import {ChatRoom, RoomType} from 'types/chat-room';
import {Trade, TradeStatus} from 'types/trade';
import {getTradeById} from 'src/shared/api/trade';
import {getChatSocket, getTradingSocket} from 'src/shared/api/sockets';

export const useCreateTrade = () => {
  const createTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.CREATE_TRADE] as CreateTradeActor,
  );

  const {
    userId,
    gemColor,
    receiverGemIds,
    currentTrade,
    resultTxHash,
    chatRoomId,
  } = useSelector(createTradeActor, snapshot => snapshot.context);

  const value = useSelector(createTradeActor, snapshot => snapshot.value);
  console.log('🚀 ~ initiator trade status: ', value);

  const isCheckingTradeStatus = useSelector(createTradeActor, snapshot =>
    snapshot.matches('checkingTradeStatus'),
  );

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

  const isReviewingOfferedGems = useSelector(createTradeActor, snapshot =>
    snapshot.matches('reviewingOfferedGems'),
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

  const tradingSocket = useMemo(() => getTradingSocket(), []);
  const chatSocket = useMemo(() => getChatSocket(), []);

  // on trade enter
  useEffect(() => {
    (async () => {
      try {
        if (!isCheckingTradeStatus) return;

        if (currentTrade === undefined) {
          createTradeActor.send({type: 'setFindRecipient'});
          return;
        }

        const trade = await getTradeById(currentTrade.id);

        switch (trade.status) {
          case TradeStatus.PENDING:
            createTradeActor.send({type: 'setWaitingAcceptance'});
            break;

          case TradeStatus.ACCEPTED:
            createTradeActor.send({type: 'setReviewingOfferedGems'});
            break;

          case TradeStatus.WAITING_SIGNATURE:
            createTradeActor.send({type: 'setWaitingFinish'});
            break;

          case TradeStatus.SIGNED:
            createTradeActor.send({type: 'setWaitingFinish'});
            break;

          default:
            break;
        }
      } catch (error) {
        createTradeActor.send({type: 'exit'});
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: TradeErrors.LOAD_TRADE,
        });
      }
    })();
  }, [isCheckingTradeStatus, currentTrade, createTradeActor]);

  // listen trade WS events
  useEffect(() => {
    if (!currentTrade?.id) return;

    tradingSocket.on(TradingEventType.TradeAccepted, (trade: Trade) => {
      if (trade.id !== currentTrade.id) return;
      createTradeActor.send({type: 'reviewOffer', currentTrade: trade});
    });

    tradingSocket.on(
      TradingEventType.TradeCompleted,
      (resultTxHash: string) => {
        createTradeActor.send({type: 'finish', resultTxHash});
      },
    );
  }, [createTradeActor, tradingSocket, currentTrade?.id]);

  // on join chat room
  useEffect(() => {
    if (chatRoomId) return;
    if (!currentTrade) return;

    chatSocket.emit('getUserRooms', {type: RoomType.TRADE});

    chatSocket.on('roomCreated', ({id, name, groupPgpPublicKey}: ChatRoom) => {
      if (name !== generateTradeRoomName(currentTrade.id)) return;

      createTradeActor.send({
        type: 'setChatData',
        chatRoomId: id,
        groupPgpPublicKey,
      });
    });

    chatSocket.once('roomDetailsFetched', (rooms: ChatRoom[]) => {
      const existingChatRoom = findTradeChatRoomByTradeId(
        currentTrade.id,
        rooms,
      );

      if (existingChatRoom) {
        const {id: chatRoomId, groupPgpPublicKey} = existingChatRoom;
        createTradeActor.send({
          type: 'setChatData',
          chatRoomId,
          groupPgpPublicKey,
        });
      }
    });
  }, [chatSocket, createTradeActor, currentTrade, chatRoomId]);

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
    },
    data: {
      userId,
      gemColor,
      receiverGemIds,
      currentTrade,
      resultTxHash,
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

  const acceptOffer = () => createTradeActor.send({type: 'acceptOffer'});

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
    acceptOffer,
    signTrade,
    exitHandler,
  };
};

export const useChat = () => {
  const [isOpenChatModal, setIsOpenChatModal] = useState(false);

  const createTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.CREATE_TRADE] as CreateTradeActor,
  );

  const {chatRoomId, groupPgpPublicKey} = useSelector(
    createTradeActor,
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
