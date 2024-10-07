import React from 'react';
import {View} from 'react-native';
import Spinner from 'components/spinner';

import style from './overlay-loader.styles';

export const OverlayLoader = () => {
  return (
    <View style={style.container}>
      <Spinner />
    </View>
  );
};
