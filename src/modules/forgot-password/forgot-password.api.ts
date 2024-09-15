import * as yup from 'yup';
import axios from 'axios';

import {FormMessages} from '../../enums/form-messages';

export const forgotPasswordFormSchema = yup.object().shape({
  email: yup.string().trim().email(FormMessages.INVALID_EMAIL).required(),
});

export const forgotPassword = async (email: string): Promise<void> =>
  (await axios.post<void>('/auth/forgot-password', {email})).data;
