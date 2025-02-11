import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import {Dropdown} from 'react-native-element-dropdown';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import styles from './select-recipient.styles';
import {useFindRecipient} from './select-recipient.hooks';

export const SelectRecipient: FC = () => {
  const {data, value, onChangeText, submit, onChange} = useFindRecipient();

  const {top} = useSafeAreaInsets();

  const mainContainerMarginTop = top ? 0 : 16;

  return (
    <View style={[styles.container, {marginTop: mainContainerMarginTop}]}>
      <Text category="h6">Select user for trade</Text>

      <Dropdown
        data={data}
        value={value}
        onChange={onChange}
        labelField="bbId"
        valueField="bbId"
        placeholder="Users"
        search
        searchField="bbId"
        searchPlaceholder="Find user by bbId"
        style={styles.userSelector}
        onChangeText={onChangeText}
      />

      <Button onPress={submit} style={styles.submitButton} disabled={!value}>
        NEXT
      </Button>
    </View>
  );
};
