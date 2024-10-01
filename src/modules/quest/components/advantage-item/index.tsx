import React, {FC} from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

import styles from './advantage-item.styles';
import {ProfileSocialProps} from './advantage-item.types';

const AdvantageItem: FC<ProfileSocialProps> = ({
  style,
  hint,
  value,
  ...viewProps
}) => {
  return (
    <View {...viewProps} style={[styles.container, style]}>
      <Text category="s2" style={styles.value}>
        {value}
      </Text>
      <Text appearance="hint" category="c2" style={styles.hint}>
        {hint}
      </Text>
    </View>
  );
};

export default AdvantageItem;
