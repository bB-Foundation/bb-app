import React, {FC} from 'react';
import {Button} from '@ui-kitten/components';

import {useButtonLogic} from './reset-button.hooks';

export const ResetButton: FC = () => {
  const {onPress} = useButtonLogic();

  return (
    <Button appearance="ghost" status="basic" onPress={onPress}>
      Reset
    </Button>
  );
};
