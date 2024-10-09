import React from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

import styles from './no-camera-device-error.styles';

const NoCameraDeviceError = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera error</Text>
    </View>
  );
};

export default NoCameraDeviceError;
