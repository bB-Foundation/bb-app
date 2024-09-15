import * as yup from 'yup';

import {restorePasswordFormSchema} from './restore-password.api';

export type RestorePasswordFormFields = yup.InferType<
  typeof restorePasswordFormSchema
>;

export type RestorePasswordData = {
  code: string;
  password: string;
};
