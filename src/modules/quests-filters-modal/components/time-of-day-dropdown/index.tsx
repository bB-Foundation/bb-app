import React, {FC} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import styles from './time-of-day-dropdown.styles';
import {data} from './time-of-day-dropdown.api';
import {useDropdownLogic} from './time-of-day-dropdown.hooks';

export const TimeOfDayDropdown: FC = () => {
  const {value, setTimeOfDayHandler} = useDropdownLogic();

  return (
    <Dropdown
      data={data}
      value={value}
      onChange={item => setTimeOfDayHandler(item.value)}
      style={styles.container}
      labelField="label"
      valueField="value"
      placeholder="Select time of day"
    />
  );
};
