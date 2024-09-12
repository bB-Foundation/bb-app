import * as yup from 'yup';

import {signInFormSchema} from './sign-in.api';

export type SignInFormFields = yup.InferType<typeof signInFormSchema>;
