import * as yup from 'yup';
import axios from 'axios';

import {RestorePasswordData} from './restore-password.types';

export const restorePasswordFormSchema = yup.object().shape({
  password: yup.string().min(8).required(),
});

export const restorePassword = async (
  data: RestorePasswordData,
): Promise<void> =>
  (await axios.post<void>('/auth/restore-password', data)).data;
