import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {CodeFieldProps} from './code-field.types';

export const useCodeField = ({value, setValue, cellCount}: CodeFieldProps) => {
  const ref = useBlurOnFulfill({value, cellCount});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return {ref, props, getCellOnLayoutHandler};
};
