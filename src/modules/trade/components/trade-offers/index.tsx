import React, {FC} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import FastImage from '@d11/react-native-fast-image';

import styles from './trade-offers.styles';
import {tradingActor} from '../../api/trading-machine';
import {useTradeOffers} from './trade-offers.hooks';
import {getGemImageSourceByColor} from 'src/shared/api/gems';

export const TradeOffers: FC = () => {
  const {tradeOffers, initiatorGemDetailsByTrade} = useTradeOffers();

  if (!tradeOffers.length || !Object.keys(initiatorGemDetailsByTrade).length)
    return null;

  return (
    <View style={styles.container}>
      <Text category="h6">Available trade offers</Text>

      <FlatList
        scrollEnabled={false}
        contentContainerStyle={styles.offersContainer}
        data={tradeOffers}
        renderItem={({item}) => {
          const gems = initiatorGemDetailsByTrade[item.id];

          return (
            <View style={styles.offerItem}>
              <View style={styles.gemsContainer}>
                <FastImage
                  resizeMode="contain"
                  style={styles.gemImage}
                  source={getGemImageSourceByColor(gems[0].attributes.color)}
                />

                <Text category="h4">x {gems.length}</Text>
              </View>

              <Button
                size="small"
                onPress={() =>
                  tradingActor.send({type: 'accept', currentTrade: item})
                }>
                Accept
              </Button>
            </View>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
