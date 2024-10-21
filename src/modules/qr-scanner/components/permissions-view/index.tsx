import React from 'react';
import {View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';

import styles from './permissions-view.styles';
import {requestCameraPermission} from './permissions-view.api';

const PermissionsView = () => {
  return (
    <View style={styles.container}>
      <Text category="h6" style={styles.text}>
        No camera permission
      </Text>

      <Button onPress={requestCameraPermission}>GRANT CAMERA PERMISSION</Button>
    </View>
  );
};

export default PermissionsView;
