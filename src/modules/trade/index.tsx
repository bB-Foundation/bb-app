import React, {FC} from 'react';
import {View} from 'react-native';
import {Button} from '@ui-kitten/components';

import Page from 'components/page';
import styles from './trade.styles';
import {useTradeLogic} from './trade.hooks';
import {createTradeHandler} from './api/trade.api';
import {CreateTrade} from './components/create-trade';
import {AcceptTrade} from './components/accept-trade';
import {TradeOffers} from './components/trade-offers';

export const Trade: FC = () => {
  const {isIdle, isWaitingTradeOffers, isAcceptTrade, isCreateTrade} =
    useTradeLogic();

  return (
    <Page isBottomTabContainer>
      {isCreateTrade && <CreateTrade />}

      {isAcceptTrade && <AcceptTrade />}

      {isWaitingTradeOffers && <TradeOffers />}

      {(isIdle || isWaitingTradeOffers) && (
        <View style={styles.buttonsContainer}>
          <Button onPress={createTradeHandler} style={styles.createTradeButton}>
            CREATE TRADE OFFER
          </Button>
        </View>
      )}
    </Page>
  );
};
