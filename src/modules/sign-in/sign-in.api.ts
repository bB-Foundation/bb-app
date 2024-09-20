import * as yup from 'yup';

import {FormMessages} from '../../enums/form-messages';

export const signInFormSchema = yup.object().shape({
  email: yup.string().trim().email(FormMessages.INVALID_EMAIL).required(),
  password: yup.string().required(),
});
