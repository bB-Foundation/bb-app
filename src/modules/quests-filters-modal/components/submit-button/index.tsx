import React, {FC} from 'react';
import {Button} from '@ui-kitten/components';

import {useButtonLogic} from './submit-button.hooks';

export const SubmitButton: FC = () => {
  const {submitHandler} = useButtonLogic();

  return <Button onPress={submitHandler}>APPLY</Button>;
};
