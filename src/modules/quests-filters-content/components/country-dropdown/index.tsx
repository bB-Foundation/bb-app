import React, {FC} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import styles from './country-dropdown.styles';
import {data} from './country-dropdown.api';
import {useDropdownLogic} from './country-dropdown.hooks';

export const CountryDropdown: FC = () => {
  const {value, setCountryHandler} = useDropdownLogic();

  return (
    <Dropdown
      data={data}
      value={value}
      onChange={item => setCountryHandler(item.value)}
      style={styles.container}
      labelField="label"
      valueField="value"
      placeholder="Select country"
    />
  );
};
