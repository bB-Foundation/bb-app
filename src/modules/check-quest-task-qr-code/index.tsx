import React, {FC} from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

import styles from './check-quest-task-qr-code.styles';
import CheckLocation from '../../assets/images/qr-code/check-location.svg';
import Page from 'components/page';
import Spinner from 'components/spinner';
import {useCheckQrCode} from './check-quest-task-qr-code.hooks';

export const CheckQuestTaskQrCode: FC = () => {
  const {isProcessing} = useCheckQrCode();

  return (
    <Page isBottomTabContainer>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <CheckLocation width="100%" height="100%" />
        </View>

        {isProcessing && (
          <View style={styles.statusContainer}>
            <Text category="h6" style={styles.processingText}>
              We are checking your QR code
            </Text>
            <Spinner />
          </View>
        )}
      </View>
    </Page>
  );
};
