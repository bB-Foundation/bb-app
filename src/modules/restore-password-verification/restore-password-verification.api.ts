import api from 'configs/axios';

export const verifyPasswordRestore = async (code: string) =>
  (await api.post<void>('/auth/verify-reset-code', {code})).data;
