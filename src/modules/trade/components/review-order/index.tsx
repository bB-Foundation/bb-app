import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, useStyleSheet} from '@ui-kitten/components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {useGem} from 'hooks/gems';
import Delayed from 'hooks/delayed';
import {OfferCard} from '../offer-card';
import rootStyles from './review-order.styles';
import SwapIcon from 'src/assets/images/swap.svg';
import {ReviewOrderProps} from './review-order.types';
import Toast from 'react-native-toast-message';
import {Errors} from 'src/enums/errors';

export const ReviewOrder: FC<ReviewOrderProps> = ({
  isSubmitting,
  gemsAmount,
  user1GemIds,
  user2GemIds,
  submitHandler,
}) => {
  const styles = useStyleSheet(rootStyles);

  const {
    data: user1GemsMetadata,
    isFetching: isFetchingUser1GemsMetadata,
    isError: user1GemsError,
  } = useGem(user1GemIds[0]);
  const {
    data: user2GemsMetadata,
    isFetching: isFetchingUser2GemsMetadata,
    isError: user2GemsError,
  } = useGem(user2GemIds?.[0] ?? 0);

  if (user1GemsError || user2GemsError) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: Errors.UNKNOWN,
    });
  }

  return (
    <View style={styles.content}>
      {isFetchingUser1GemsMetadata ? (
        <OfferCardPlaceholder />
      ) : (
        <Delayed placeholder={<OfferCardPlaceholder />}>
          <OfferCard
            owner="You"
            gemsAmount={gemsAmount}
            gemColor={user1GemsMetadata?.attributes.color}
          />
        </Delayed>
      )}

      <SwapIcon style={styles.swapIcon} width={24} height={24} />

      {isFetchingUser2GemsMetadata ? (
        <OfferCardPlaceholder />
      ) : (
        <Delayed placeholder={<OfferCardPlaceholder />}>
          <OfferCard
            owner={'Recipient'}
            gemsAmount={gemsAmount}
            gemColor={user2GemsMetadata?.attributes.color}
          />
        </Delayed>
      )}

      <Button
        onPress={submitHandler}
        style={styles.submitButton}
        disabled={
          isSubmitting ||
          isFetchingUser1GemsMetadata ||
          isFetchingUser2GemsMetadata
        }>
        ACCEPT
      </Button>
    </View>
  );
};

const OfferCardPlaceholder = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item width="100%" borderRadius={10} height={66} />
  </SkeletonPlaceholder>
);
