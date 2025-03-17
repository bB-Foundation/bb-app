import {useEffect, useMemo} from 'react';
import {useSelector} from '@xstate/react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {GemColor} from 'types/gem';
import {tradingActor, TradingEventType} from '../../api/trading-machine';
import {TradingMachinesIds} from '../../api/trade.api';
import {CreateTradeActor} from '../../api/create-trade-machine';
import {ChatRoom} from 'types/chat-room';
import {NavigationProp} from 'src/modules/navigation/navigation.types';
import {TradeStatus} from 'types/trade';
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
            createTradeActor.send({type: 'setSigning'});
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
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error while loading the trade',
        });
      }
    })();
  }, [isCheckingTradeStatus, currentTrade, createTradeActor]);

  // listen trade WS events
  useEffect(() => {
    tradingSocket.on(TradingEventType.TradeAccepted, () => {
      createTradeActor.send({type: 'checkAcceptance'});
    });

    tradingSocket.on(
      TradingEventType.TradeCompleted,
      (resultTxHash: string) => {
        createTradeActor.send({type: 'finish', resultTxHash});
      },
    );
  }, [createTradeActor, tradingSocket]);

  // on join chat room
  useEffect(() => {
    chatSocket.on('roomCreated', ({id, groupPgpPublicKey}: ChatRoom) => {
      createTradeActor.send({
        type: 'setChatData',
        chatRoomId: id,
        groupPgpPublicKey: groupPgpPublicKey,
      });
    });
  }, [chatSocket, createTradeActor]);

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
      chatRoomId,
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

export const useChat = () => {
  const navigation = useNavigation<NavigationProp>();

  const createTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.CREATE_TRADE] as CreateTradeActor,
  );

  const {chatRoomId, groupPgpPublicKey} = useSelector(
    createTradeActor,
    snapshot => snapshot.context,
  );

  const openChatModal = () => {
    navigation.navigate('chat', {chatRoomId, groupPgpPublicKey, title: 'Chat'});
  };

  return {
    chatRoomId,
    openChatModal,
  };
};
