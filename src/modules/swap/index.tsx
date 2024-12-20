import React, {FC} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import {Button} from '@ui-kitten/components';

import styles from './swap.styles';
import Page from 'components/page';
import webApp from 'components/web-app';
import {useSwapLogic} from './swap.hooks';
import {Gem} from '../../components/gem';
import {GemColor} from 'types/gem';
import {OverlayLoader} from 'components/overlay-loader';

const Swap: FC = () => {
  const {
    isLoading,
    stackedGems,
    isSubmitting,
    webBrowserRef,
    currentUserProfile,
    onWebBrowserMessage,
    startSwap,
  } = useSwapLogic();

  if (!currentUserProfile) return null;

  return (
    <Page isBottomTabContainer>
      <View style={styles.hidden}>
        <WebView
          ref={webBrowserRef}
          source={{html: webApp}}
          onMessage={onWebBrowserMessage}
        />
      </View>

      {isLoading && <OverlayLoader />}

      <View style={styles.gemsContainer}>
        {Object.keys(stackedGems).map(k => (
          <Gem
            key={k}
            color={k as GemColor}
            amount={stackedGems[k].length}
            imageUrl={stackedGems[k][0]?.imageUrl}
            isSelected={false}
          />
        ))}
      </View>

      <Button
        disabled={isSubmitting}
        onPress={startSwap}
        style={styles.submitButton}>
        SWAP GEMS
      </Button>
    </Page>
  );
};

export default Swap;
