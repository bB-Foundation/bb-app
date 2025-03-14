import React from 'react';
import {View} from 'react-native';
import {useSelector} from '@xstate/react';
import {RouteProp, useRoute} from '@react-navigation/native';

import themedStyles from './trade-chat.styles';
import {TradeStackParamList} from '../navigation/navigation.types';
import {Chat} from '../../components/chat';
import {TradingMachinesIds} from '../trade/api/trade.api';
import {tradingActor} from '../trade/api/trading-machine';
import {AcceptTradeActor} from '../trade/api/accept-trade-machine';
import {CreateTradeActor} from '../trade/api/create-trade-machine';
import {useStyleSheet} from '@ui-kitten/components';

export const TradeChat = () => {
  const {
    params: {isInitiator},
  } = useRoute<RouteProp<TradeStackParamList, 'chat'>>();

  const createTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.CREATE_TRADE] as CreateTradeActor,
  );

  const createTradeData = useSelector(
    createTradeActor,
    snapshot => snapshot?.context,
  );

  const acceptTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.ACCEPT_TRADE] as AcceptTradeActor,
  );

  const acceptTradeData = useSelector(
    acceptTradeActor,
    snapshot => snapshot?.context,
  );

  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      {isInitiator ? (
        <Chat
          chatSocket={createTradeData.chatSocket}
          chatRoomId={createTradeData.chatRoomId}
          groupPgpPublicKey={createTradeData.groupPgpPublicKey}
        />
      ) : (
        <Chat
          chatSocket={acceptTradeData.chatSocket}
          chatRoomId={acceptTradeData.chatRoomId}
          groupPgpPublicKey={acceptTradeData.groupPgpPublicKey}
        />
      )}
    </View>
  );
};
