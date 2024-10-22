import api from 'configs/axios';

export const logOut = async (): Promise<void> =>
  (await api.post<void>('/auth/logout')).data;
