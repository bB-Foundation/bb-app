import * as yup from 'yup';

import {FormMessages} from '../../enums/form-messages';

export const forgotPasswordFormSchema = yup.object().shape({
  email: yup.string().trim().email(FormMessages.INVALID_EMAIL).required(),
});
