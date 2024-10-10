import * as yup from 'yup';

import {signUpFormSchema} from './sign-up.api';

export type SignUpFormFields = yup.InferType<typeof signUpFormSchema>;

export type SignUpData = {
  email: string;
  password: string;
};
