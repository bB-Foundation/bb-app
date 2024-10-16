import React from 'react';
import {View} from 'react-native';
import Spinner from 'components/spinner';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import styles from './loader.styles';

export const Loader = () => {
  const {height} = useSafeAreaFrame();
  const {top, bottom} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {top: (height - top - bottom) / 2 - 32}]}>
      <Spinner />
    </View>
  );
};
