import {FieldError, FieldErrorsImpl, Merge} from 'react-hook-form';

export const getErrorMessage = (
  fieldError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
): string => fieldError?.message?.toString() ?? '';
