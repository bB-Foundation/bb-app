import React from 'react';
import {View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {hasNotch} from 'react-native-device-info';
import ActionSheet from 'react-native-actions-sheet';

import styles from './top-bar.styles';
import {useTopBarLogic} from './top-bar.hooks';
import {QuestsFiltersContent} from 'src/modules/quests-filters-content';

export const TopBar = () => {
  const {
    filtersModalRef,
    openFiltersModal,
    onFiltersModalClose,
    onFiltersModalApply,
  } = useTopBarLogic();

  return (
    <View style={styles.container}>
      <Button
        status="basic"
        style={[styles.button, hasNotch() ? null : styles.buttonMargin]}
        onPress={openFiltersModal}>
        Filter
      </Button>

      <ActionSheet
        gestureEnabled={true}
        ref={filtersModalRef}
        onClose={onFiltersModalClose}>
        <View style={styles.modalContent}>
          <QuestsFiltersContent afterSubmitCb={onFiltersModalApply} />
        </View>
      </ActionSheet>
    </View>
  );
};
