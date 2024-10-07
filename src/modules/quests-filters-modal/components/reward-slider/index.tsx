import React, {FC} from 'react';
import {View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {Text} from '@ui-kitten/components';

import styles from './reward-slider.styles';
import {useSliderLogic} from './reward-slider.hooks';

export const RewardSlider: FC = () => {
  const {minRewardsLabelValue, setMinRewardsLabelValue, setMinRewardsHandler} =
    useSliderLogic();

  return (
    <>
      <View style={styles.labelsView}>
        <Text>Minimum reward</Text>
        <Text>{minRewardsLabelValue} gems</Text>
      </View>

      <Slider
        value={minRewardsLabelValue}
        onValueChange={([v]) => setMinRewardsLabelValue(v)}
        onSlidingComplete={([v]) => setMinRewardsHandler(v)}
        step={1}
        minimumValue={1}
        maximumValue={50}
      />
    </>
  );
};
