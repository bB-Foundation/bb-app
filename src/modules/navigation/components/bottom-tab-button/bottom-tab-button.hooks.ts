import {useSelector} from '@xstate/react';
import {Alert, GestureResponderEvent} from 'react-native';

import {tradingActor} from 'src/modules/trade/api/trading-machine';
import {TradingMachinesIds} from 'src/modules/trade/api/trade.api';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {CreateTradeActor} from 'src/modules/trade/api/create-trade-machine';
import {AcceptTradeActor} from 'src/modules/trade/api/accept-trade-machine';

const useIsTradeActive = () => {
  const createTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.CREATE_TRADE] as
        | CreateTradeActor
        | undefined,
  );

  const acceptTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.ACCEPT_TRADE] as AcceptTradeActor,
  );

  return Boolean(createTradeActor || acceptTradeActor);
};

export const useHandlers = ({
  bottomTabBarButtonProps,
}: {
  bottomTabBarButtonProps: BottomTabBarButtonProps;
}) => {
  const isTradeActive = useIsTradeActive();

  const handleOnPress = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent,
  ) => {
    if (isTradeActive) {
      Alert.alert(
        'Trade in Progress',
        'Please complete or cancel your trade first',
        [{text: 'OK', style: 'cancel'}],
      );
    } else {
      return (
        bottomTabBarButtonProps.onPress && bottomTabBarButtonProps.onPress(e)
      );
    }
  };

  return {handleOnPress};
};
