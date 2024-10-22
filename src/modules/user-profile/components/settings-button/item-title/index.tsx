import React, {FC} from 'react';
import {Text} from '@ui-kitten/components';

import styles from './item-title.styles';
import {ItemTitleProps} from './item-title.types';

export const ItemTitle: FC<ItemTitleProps> = ({evaProps, title}) => (
  <Text style={[evaProps?.style, styles.text]}>{title}</Text>
);
