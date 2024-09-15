import axios from 'axios';

export const verifyPasswordRestore = async (code: string) =>
  (await axios.post<void>('/auth/verify-reset-code', {code})).data;
