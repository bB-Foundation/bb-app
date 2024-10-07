import React, {FC} from 'react';
import {View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {Text} from '@ui-kitten/components';

import styles from './distance-slider.styles';
import {useSliderLogic} from './distance-slider.hooks';

export const DistanceSlider: FC = () => {
  const {distanceLabelValue, setDistanceLabelValue, setDistanceHandler} =
    useSliderLogic();

  return (
    <>
      <View style={styles.labelsView}>
        <Text>Distance to quest</Text>
        <Text>{distanceLabelValue} km</Text>
      </View>

      <Slider
        value={distanceLabelValue}
        onValueChange={([v]) => setDistanceLabelValue(v)}
        onSlidingComplete={([v]) => setDistanceHandler(v)}
        step={0.5}
        minimumValue={0.5}
        maximumValue={50}
      />
    </>
  );
};
