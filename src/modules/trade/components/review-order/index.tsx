import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, useStyleSheet} from '@ui-kitten/components';

import {OfferCard} from '../offer-card';
import rootStyles from './review-order.styles';
import SwapIcon from 'src/assets/images/swap.svg';
import {ReviewOrderProps} from './review-order.types';

export const ReviewOrder: FC<ReviewOrderProps> = ({
  isSubmitting,
  gemsAmount,
  gemColor,
  submitHandler,
}) => {
  const styles = useStyleSheet(rootStyles);

  return (
    <View style={styles.content}>
      <OfferCard owner="You" gemsAmount={gemsAmount} gemColor={gemColor} />
      <SwapIcon style={styles.swapIcon} width={24} height={24} />
      <OfferCard owner={'Recipient'} gemsAmount={gemsAmount} gemColor="black" />
      <Button
        onPress={submitHandler}
        style={styles.submitButton}
        disabled={isSubmitting}>
        ACCEPT
      </Button>
    </View>
  );
};
