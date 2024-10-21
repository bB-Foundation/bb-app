import React from 'react';
import {View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';

import styles from './request-geo-permission-view.styles';
import {requestLocationPermission} from './request-geo-permission-view.api';

export const RequestGeoPermissionView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} category="h6">
        Precise location access is needed to use this screen
      </Text>

      <Button
        onPress={requestLocationPermission}
        testID="request-geo-permission">
        GRANT GEO PERMISSION
      </Button>
    </View>
  );
};
