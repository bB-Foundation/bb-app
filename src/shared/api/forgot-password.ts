import api from 'configs/axios';

export const forgotPassword = async (email: string): Promise<void> =>
  (await api.post<void>('/auth/forgot-password', {email})).data;
