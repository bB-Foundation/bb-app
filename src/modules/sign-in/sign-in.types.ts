import * as yup from 'yup';

import {signInFormSchema} from './sign-in.api';

export type SignInFormFields = yup.InferType<typeof signInFormSchema>;

export type SignInData = {
  email: string;
  password: string;
};

export type AuthData = {
  refreshToken: string;
  accessToken: string;
};
