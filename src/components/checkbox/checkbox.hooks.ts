import {useFormContext} from 'react-hook-form';
import {getErrorMessage} from './checkbox.utils';

export const useCheckBox = (name: string) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const fieldError = errors?.[name];

  const errorMessage = getErrorMessage(fieldError);

  return {control, errorMessage};
};
