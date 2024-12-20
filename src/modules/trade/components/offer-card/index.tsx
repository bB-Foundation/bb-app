import React, {FC} from 'react';
import {TextInput, View} from 'react-native';
import {Card, Text} from '@ui-kitten/components';
import FastImage from '@d11/react-native-fast-image';

import styles from './offer-card.styles';
import {OfferCardProps} from './offer-card.types';
import {getGemImageSourceByColor} from 'src/shared/api/gems';

export const OfferCard: FC<OfferCardProps> = ({
  owner,
  gemsAmount,
  gemColor,
}) => {
  return (
    <Card style={styles.card} disabled>
      <View style={styles.content}>
        <View style={styles.userOffer}>
          <Text>{owner}</Text>

          <View style={styles.gemInputView}>
            <TextInput
              readOnly
              value={gemsAmount.toString()}
              style={styles.tokensInput}
            />
            <FastImage
              resizeMode="contain"
              style={styles.gemImage}
              source={getGemImageSourceByColor(gemColor)}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};
