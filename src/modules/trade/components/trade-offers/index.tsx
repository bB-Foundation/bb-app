import React, {FC} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import FastImage from '@d11/react-native-fast-image';

import styles from './trade-offers.styles';
import {useHandlers, useTradeOffers} from './trade-offers.hooks';
import {getGemImageSourceByColor} from 'src/shared/api/gems';

export const TradeOffers: FC = () => {
  const {tradeOffers, initiatorGemDetailsByTrade} = useTradeOffers();

  const {openTrade} = useHandlers();

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
          const gems = initiatorGemDetailsByTrade?.[item.id];
          if (!gems) return null;

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

              <Button size="small" onPress={() => openTrade(item)}>
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
