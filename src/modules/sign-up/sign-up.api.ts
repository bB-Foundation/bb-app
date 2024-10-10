import * as yup from 'yup';

import {FormMessages} from '../../enums/form-messages';
import {SignUpData} from './sign-up.types';
import api from 'configs/axios';

export const signUpFormSchema = yup.object().shape({
  email: yup.string().trim().email(FormMessages.INVALID_EMAIL).required(),
  password: yup.string().min(8).required(),
});

export const signUp = async (signUpData: SignUpData): Promise<void> =>
  (await api.post<void>('/auth/signup', signUpData)).data;
