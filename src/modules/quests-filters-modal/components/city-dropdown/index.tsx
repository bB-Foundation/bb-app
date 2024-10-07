import React, {FC} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import styles from './city-dropdown.styles';
import {data} from './city-dropdown.api';
import {useDropdownLogic} from './city-dropdown.hooks';

export const CityDropdown: FC = () => {
  const {value, setCityHandler} = useDropdownLogic();

  return (
    <Dropdown
      data={data}
      value={value}
      onChange={item => setCityHandler(item.value)}
      style={styles.container}
      labelField="label"
      valueField="value"
      placeholder="Select city"
    />
  );
};
