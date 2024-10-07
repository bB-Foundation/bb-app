import React, {FC} from 'react';
import {Button} from '@ui-kitten/components';

import styles from './submit-button.styles';
import {SubmitButtonProps} from './submit-button.types';
import {useButtonLogic} from './submit-button.hooks';

export const SubmitButton: FC<SubmitButtonProps> = ({onSubmit}) => {
  const {isValidVerificationCode, isSubmitting} = useButtonLogic();

  return (
    <Button
      style={styles.button}
      size="giant"
      onPress={onSubmit}
      disabled={!isValidVerificationCode || isSubmitting}
      testID="submit-button">
      VERIFY
    </Button>
  );
};
