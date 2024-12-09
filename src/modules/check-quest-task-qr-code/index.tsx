import React, {FC} from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';
import WebView from 'react-native-webview';

import styles from './check-quest-task-qr-code.styles';
import CheckLocation from '../../assets/images/qr-code/check-location.svg';
import Page from 'components/page';
import webApp from 'components/web-app';
import Spinner from 'components/spinner';
import {useCheckQrCode} from './check-quest-task-qr-code.hooks';

export const CheckQuestTaskQrCode: FC = () => {
  const {webBrowserRef, onWebBrowserMessage} = useCheckQrCode();

  return (
    <Page isBottomTabContainer>
      <WebView
        ref={webBrowserRef}
        source={{html: webApp}}
        onMessage={onWebBrowserMessage}
      />

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <CheckLocation width="100%" height="100%" />
        </View>

        <View style={styles.statusContainer}>
          <Text category="h6" style={styles.processingText}>
            We are checking your QR code
          </Text>
          <Spinner />
        </View>
      </View>
    </Page>
  );
};
