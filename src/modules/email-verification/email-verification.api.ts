import OpenPGP from 'react-native-fast-openpgp';

import api from 'configs/axios';
import {encryptData} from 'src/shared/utils/crypto';
import {
  getJwtAccessToken,
  getUserPassword,
  storeUserPgpPrivateKey,
} from 'src/shared/utils/secure-storage';
import {DeployAccountAdditionalData} from './email-verification.types';

export const verifyEmail = async (verificationCode: string): Promise<void> =>
  (await api.post<void>('/auth/email-verification', {code: verificationCode}))
    .data;

export const resendEmailVerification = async (email: string): Promise<void> =>
  (await api.post<void>('/auth/resend-email-verification', {email})).data;

export const getDeployAccountAdditionalData = async (
  privateKey: string,
  userId: number,
): Promise<DeployAccountAdditionalData> => {
  const password = await getUserPassword();
  if (!password) throw Error();

  const accessToken = await getJwtAccessToken();
  if (!accessToken) throw Error();

  const baseApiUrl = `${process.env.BACKEND_API_URL}:${process.env.BACKEND_API_PORT}`;
  if (!baseApiUrl) throw Error();

  const encryptedPrivateKey = await encryptData(privateKey, password);

  const {publicKey: pgpPublicKey, privateKey: pgpPrivateKey} =
    await OpenPGP.generate({
      passphrase: userId.toString(),
      keyOptions: {rsaBits: 1024},
    });

  await storeUserPgpPrivateKey(pgpPrivateKey, userId);

  return {
    encryptedPrivateKey,
    accessToken,
    baseApiUrl,
    pgpPublicKey,
  };
};

export const assignBbId = (txHash: string) =>
  api.post('/user/assign-bbid', {txHash});
