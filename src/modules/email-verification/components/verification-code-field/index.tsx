import React from 'react';

import CodeField from 'components/forms/code-field';
import {useFieldLogic} from './verification-code-field.hooks';

export const VerificationCodeField = () => {
  const {value, onChangeHandler} = useFieldLogic();

  return <CodeField cellCount={6} value={value} setValue={onChangeHandler} />;
};
