import * as yup from 'yup';
import axios from 'axios';

import {FormMessages} from '../../enums/form-messages';
import {AuthData, SignInData} from './sign-in.types';

export const signInFormSchema = yup.object().shape({
  email: yup.string().trim().email(FormMessages.INVALID_EMAIL).required(),
  password: yup.string().required(),
});

export const logIn = async (data: SignInData): Promise<AuthData> =>
  (await axios.post<AuthData>('/auth/signin', data)).data;
