import React from 'react';
import {View} from 'react-native';
import {useStyleSheet} from '@ui-kitten/components';

import rootStyles from './quests-filters-modal.styles';
import Page from 'components/page';
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
import {useQuestsFiltersLogic} from './quests-filters-modal.hooks';

export const QuestsFiltersModal = () => {
  const styles = useStyleSheet(rootStyles);

  useQuestsFiltersLogic();

  return (
    <Page>
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
          <SubmitButton />
        </View>
      </View>
    </Page>
  );
};
