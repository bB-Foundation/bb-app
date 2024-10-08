import React from 'react';
import {View} from 'react-native';
import {Button} from '@ui-kitten/components';

import styles from './top-bar.styles';
import {useTopBarLogic} from './top-bar.hooks';

export const TopBar = () => {
  const {openFiltersModal} = useTopBarLogic();

  return (
    <View style={styles.container}>
      {/* <Button status="basic" style={styles.button}>
        Sort by
      </Button> */}
      <Button status="basic" style={styles.button} onPress={openFiltersModal}>
        Filter
      </Button>
    </View>
  );
};
