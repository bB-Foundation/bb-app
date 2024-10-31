import React from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

import styles from './no-quests.styles';
import NoDataIcon from 'src/assets/images/no-data.svg';

export const NoQuests = () => {
  return (
    <View style={styles.container}>
      <NoDataIcon width={150} height={150} />
      <Text category="h6" style={styles.text}>
        No quests available. Please update your filters and try again.
      </Text>
    </View>
  );
};
