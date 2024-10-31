import React, {FC} from 'react';
import {Datepicker} from '@ui-kitten/components';

import styles from './end-date-input.styles';
import {useInputLogic} from './end-date-input';

export const EndDateInput: FC = () => {
  const {date, onSelect} = useInputLogic();

  return (
    <Datepicker
      date={date}
      onSelect={onSelect}
      label="End date"
      style={styles.field}
    />
  );
};
