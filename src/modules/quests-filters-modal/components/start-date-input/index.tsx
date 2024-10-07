import React, {FC} from 'react';
import {Datepicker} from '@ui-kitten/components';

import styles from './start-date-input.styles';
import {useInputLogic} from './start-date-input.hooks';

export const StartDateInput: FC = () => {
  const {date, onSelect} = useInputLogic();

  return (
    <Datepicker
      date={date}
      onSelect={onSelect}
      label="Start date"
      style={styles.field}
    />
  );
};
