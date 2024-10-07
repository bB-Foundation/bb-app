import React, {FC} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import styles from './category-dropdown.styles';
import {data} from './category-dropdown.api';
import {useDropdownLogic} from './category-dropdown.hooks';

export const CategoryDropdown: FC = () => {
  const {value, setCategoryHandler} = useDropdownLogic();

  return (
    <Dropdown
      data={data}
      value={value}
      onChange={item => setCategoryHandler(item.value)}
      style={styles.container}
      labelField="label"
      valueField="value"
      placeholder="Select category"
    />
  );
};
