import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Text, useStyleSheet} from '@ui-kitten/components';

import HandshakeIcon from 'src/assets/images/trade/handshake.svg';
import rootStyles from './finish.styles';
import {FinishProps} from './finish.types';
import {openBlockChainExplorer} from './finish.api';

export const Finish: FC<FinishProps> = ({message, txHash, exitHandler}) => {
  const styles = useStyleSheet(rootStyles);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <HandshakeIcon width="100%" height="100%" />
      </View>

      <View style={styles.statusContainer}>
        <Text category="h6" style={styles.processingText}>
          {message}
        </Text>

        <Button
          onPress={() => openBlockChainExplorer(txHash)}
          size="large"
          appearance="ghost">
          View on Blockchain Explorer
        </Button>
      </View>

      <Button style={styles.submitButton} onPress={exitHandler}>
        CONTINUE
      </Button>
    </View>
  );
};
