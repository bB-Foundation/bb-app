import * as yup from 'yup';

import {RestorePasswordData} from './restore-password.types';
import api from 'configs/axios';

export const restorePasswordFormSchema = yup.object().shape({
  password: yup.string().min(8).required(),
});

export const restorePassword = async (
  data: RestorePasswordData,
): Promise<void> => (await api.post<void>('/auth/restore-password', data)).data;
