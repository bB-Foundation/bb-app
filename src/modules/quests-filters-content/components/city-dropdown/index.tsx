import React, {FC} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import styles from './city-dropdown.styles';
import {useCitiesData, useDropdownLogic} from './city-dropdown.hooks';

export const CityDropdown: FC = () => {
  const {value, setCityHandler} = useDropdownLogic();

  const data = useCitiesData();

  return (
    <Dropdown
      data={data}
      value={value}
      onChange={item => setCityHandler(item.id)}
      style={styles.container}
      labelField="name"
      valueField="id"
      placeholder="Select city"
    />
  );
};
