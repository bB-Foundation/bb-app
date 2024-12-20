import React, {FC} from 'react';
import {View} from 'react-native';
import {Text, useStyleSheet} from '@ui-kitten/components';

import TimerIcon from 'src/assets/images/trade/timer.svg';
import rootStyles from './wait-finish.styles';
import {WaitFinishProps} from './wait-finish.types';
import Spinner from 'components/spinner';

export const WaitFinish: FC<WaitFinishProps> = ({message}) => {
  const styles = useStyleSheet(rootStyles);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TimerIcon width="100%" height="100%" />
      </View>

      <View style={styles.statusContainer}>
        <Text category="h6" style={styles.processingText}>
          {message}
        </Text>

        <View style={styles.spinnerWrapper}>
          <Spinner />
        </View>
      </View>
    </View>
  );
};
