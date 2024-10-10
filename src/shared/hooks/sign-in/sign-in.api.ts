import api from 'configs/axios';
import {AuthData, SignInData} from './sign-in.types';

export const logIn = async (data: SignInData): Promise<AuthData> =>
  (await api.post<AuthData>('/auth/signin', data)).data;

export const refreshAuthToken = async (
  refreshToken: string,
): Promise<AuthData> =>
  (await api.post<AuthData>('/auth/refresh-token', {refreshToken})).data;
