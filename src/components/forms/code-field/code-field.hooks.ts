import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {cellCount} from './code-field.api';
import {CodeFieldProps} from './code-field.types';

export const useCodeField = ({value, setValue}: CodeFieldProps) => {
  const ref = useBlurOnFulfill({value, cellCount});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return {ref, props, getCellOnLayoutHandler};
};
