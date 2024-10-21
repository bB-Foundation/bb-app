import React from 'react';
import {View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';

import styles from './request-geo-permission-view.styles';

export const RequestGeoPermissionView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} category="h6">
        Location access is needed to use this screen
      </Text>

      <Button testID="request-geo-permission">GRANT GEO PERMISSION</Button>
    </View>
  );
};
