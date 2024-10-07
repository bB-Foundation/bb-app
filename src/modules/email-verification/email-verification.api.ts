import api from 'configs/axios';
import {encryptData} from 'src/shared/utils/crypto';
import {
  getJwtAccessToken,
  getUserPassword,
} from 'src/shared/utils/secure-storage';
import {DeployAccountAdditionalData} from './email-verification.types';

export const verifyEmail = async (verificationCode: string): Promise<void> =>
  (await api.post<void>('/auth/email-verification', {code: verificationCode}))
    .data;

export const resendEmailVerification = async (email: string): Promise<void> =>
  (await api.post<void>('/auth/resend-email-verification', {email})).data;

export enum WebAppEvents {
  'CREATE_ACCOUNT' = 'CREATE_ACCOUNT',
  'DEPLOY_ACCOUNT' = 'DEPLOY_ACCOUNT',
  'CREATE_ACCOUNT_RESULT' = 'CREATE_ACCOUNT_RESULT',
  'DEPLOY_ACCOUNT_RESULT' = 'DEPLOY_ACCOUNT_RESULT',
}

export const isErrorMessage = (message: unknown): boolean =>
  message !== null && typeof message === 'object' && 'error' in message;

export const getDeployAccountAdditionalData = async (
  privateKey: string,
): Promise<DeployAccountAdditionalData> => {
  const password = await getUserPassword();
  if (!password) throw Error;

  const accessToken = await getJwtAccessToken();
  if (!accessToken) throw Error;

  const baseApiUrl = process.env.BACKEND_API_URL;
  if (!baseApiUrl) throw Error;

  const encryptedPrivateKey = await encryptData(privateKey, password);

  return {encryptedPrivateKey, accessToken, baseApiUrl};
};
