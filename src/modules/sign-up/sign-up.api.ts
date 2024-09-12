import * as yup from 'yup';
import {FormMessages} from '../../enums/form-messages';

export const signUpFormSchema = yup.object().shape({
  userName: yup.string().trim().required('user name is a required field'),
  email: yup.string().trim().email(FormMessages.INVALID_EMAIL).required(),
  password: yup.string().required(),
  passwordRepeat: yup
    .string()
    .required('repeat password is a required field')
    .oneOf([yup.ref('password')], 'passwords must match'),
  termsAccepted: yup
    .bool()
    .default(false)
    .oneOf([true], 'terms must be accepted'),
});
