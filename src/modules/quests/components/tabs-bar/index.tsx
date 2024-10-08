import React, {FC} from 'react';
import {View} from 'react-native';
import {Tab, TabView} from '@ui-kitten/components';

import styles from './tabs-bar.styles';
import {TabsBarProps} from './tabs-bar.types';

export const TabsBar: FC<TabsBarProps> = ({selectedIndex, onSelect}) => (
  <View style={styles.container}>
    <TabView selectedIndex={selectedIndex} onSelect={onSelect}>
      <Tab title="MAP">
        <View />
      </Tab>
      <Tab title="LIST">
        <View />
      </Tab>
    </TabView>
  </View>
);
