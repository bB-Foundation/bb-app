import React, {FC} from 'react';
import WebView from 'react-native-webview';
import {Button} from '@ui-kitten/components';

import styles from './swap.styles';
import Page from 'components/page';
import webApp from 'components/web-app';
import {useSwapLogic} from './swap.hooks';

const Swap: FC = () => {
  const {
    isSubmitting,
    webBrowserRef,
    currentUserProfile,
    onWebBrowserMessage,
    startSwap,
  } = useSwapLogic();

  if (!currentUserProfile) return null;

  return (
    <Page>
      <WebView
        ref={webBrowserRef}
        source={{html: webApp}}
        onMessage={onWebBrowserMessage}
      />
      <Button
        disabled={isSubmitting}
        onPress={startSwap}
        style={styles.submitButton}>
        START
      </Button>
    </Page>
  );
};

export default Swap;
