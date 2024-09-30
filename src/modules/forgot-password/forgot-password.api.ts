import * as yup from 'yup';

import {FormMessages} from '../../enums/form-messages';
import api from 'configs/axios';

export const forgotPasswordFormSchema = yup.object().shape({
  email: yup.string().trim().email(FormMessages.INVALID_EMAIL).required(),
});

export const forgotPassword = async (email: string): Promise<void> =>
  (await api.post<void>('/auth/forgot-password', {email})).data;
