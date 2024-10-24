import {useMutation} from '@tanstack/react-query';

import {forgotPassword} from 'src/shared/api/forgot-password';

export const useForgotPassword = () =>
  useMutation({mutationFn: forgotPassword});
