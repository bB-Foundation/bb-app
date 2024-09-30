import axios from 'axios';

import {AuthData, SignInData} from './sign-in.types';

export const logIn = async (data: SignInData): Promise<AuthData> =>
  (await axios.post<AuthData>('/auth/signin', data)).data;

export const refreshAuthToken = async (
  refreshToken: string,
): Promise<AuthData> =>
  (await axios.post<AuthData>('/auth/refresh-token', {refreshToken})).data;
