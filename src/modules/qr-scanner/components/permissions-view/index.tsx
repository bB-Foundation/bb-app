import React from 'react';
import {View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import {useCameraPermission} from 'react-native-vision-camera';

import styles from './permissions-view.styles';

const PermissionsView = () => {
  const {requestPermission} = useCameraPermission();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No camera permission</Text>
      <Button onPress={requestPermission}>Request permission</Button>
    </View>
  );
};

export default PermissionsView;
