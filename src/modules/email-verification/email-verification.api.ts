import api from 'configs/axios';

export const verifyEmail = async (verificationCode: string): Promise<void> =>
  (await api.post<void>('/auth/email-verification', {code: verificationCode}))
    .data;

export const resendEmailVerification = async (email: string): Promise<void> =>
  (await api.post<void>('/auth/resend-email-verification', {email})).data;
