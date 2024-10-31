import React, {FC} from 'react';
import {Button} from '@ui-kitten/components';

import {useButtonLogic} from './submit-button.hooks';

type SubmitButtonProps = {
  afterSubmitCb?: () => void;
};

export const SubmitButton: FC<SubmitButtonProps> = ({afterSubmitCb}) => {
  const {submitHandler} = useButtonLogic({afterSubmitCb});

  return <Button onPress={submitHandler}>APPLY</Button>;
};
