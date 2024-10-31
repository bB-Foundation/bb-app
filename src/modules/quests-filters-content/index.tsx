import React, {FC} from 'react';
import {View} from 'react-native';
import {useStyleSheet} from '@ui-kitten/components';

import rootStyles from './quests-filters-modal.styles';
import {
  CategoryDropdown,
  CityDropdown,
  CountryDropdown,
  DistanceSlider,
  EndDateInput,
  RewardSlider,
  StartDateInput,
  SubmitButton,
  TimeOfDayDropdown,
} from './components';
import {ResetButton} from './components/reset-button';
import {QuestsFiltersContentProps} from './quests-filters-modal.types';

export const QuestsFiltersContent: FC<QuestsFiltersContentProps> = ({
  afterSubmitCb,
}) => {
  const styles = useStyleSheet(rootStyles);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <CountryDropdown />
          <CityDropdown />
        </View>

        <View style={styles.rangeField}>
          <RewardSlider />
        </View>

        <View style={styles.rangeField}>
          <DistanceSlider />
        </View>

        <View style={styles.row}>
          <CategoryDropdown />
          <TimeOfDayDropdown />
        </View>

        <View style={styles.row}>
          <StartDateInput />
          <EndDateInput />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <SubmitButton afterSubmitCb={afterSubmitCb} />
        <ResetButton />
      </View>
    </View>
  );
};
