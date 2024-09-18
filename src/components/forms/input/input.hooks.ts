import {useFormContext} from 'react-hook-form';
import {getErrorMessage} from './input.utils';

export const useInput = (name: string) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const fieldError = errors?.[name];

  const errorMessage = getErrorMessage(fieldError);

  return {control, fieldError, errorMessage};
};
