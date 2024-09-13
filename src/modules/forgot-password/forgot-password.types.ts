import * as yup from 'yup';

import {forgotPasswordFormSchema} from './forgot-password.api';

export type ForgotPasswordFormFields = yup.InferType<typeof forgotPasswordFormSchema>;
