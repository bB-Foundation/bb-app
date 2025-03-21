import * as Keychain from 'react-native-keychain';

enum TokenNames {
  JWT_ACCESS = 'JWT_ACCESS',
  JWT_REFRESH = 'JWT_REFRESH',
  USER_PASSWORD = 'USER_PASSWORD',
  USER_PRIVATE_KEY = 'USER_PRIVATE_KEY',
  USER_ACCOUNT_ADDRESS = 'USER_ACCOUNT_ADDRESS',
  USER_PGP_PRIVATE_KEY = 'USER_PGP_PRIVATE_KEY',
}

const storeToken = async (
  tokenName: string,
  tokenValue: string,
): Promise<void> => {
  await Keychain.setGenericPassword(tokenName, tokenValue, {
    service: tokenName,
  });
};

const getToken = async (tokenName: string): Promise<string | null> => {
  const credentials = await Keychain.getGenericPassword({service: tokenName});
  return credentials ? credentials.password : null;
};

const clearToken = async (tokenName: string): Promise<boolean> =>
  Keychain.resetGenericPassword({service: tokenName});

// JWT ACCESS

export const storeJwtAccessToken = async (tokenValue: string): Promise<void> =>
  storeToken(TokenNames.JWT_ACCESS, tokenValue);

export const getJwtAccessToken = async (): Promise<string | null> =>
  getToken(TokenNames.JWT_ACCESS);

export const clearJwtAccessToken = async (): Promise<boolean> =>
  clearToken(TokenNames.JWT_ACCESS);

// JWT REFRESH

export const storeJwtRefreshToken = async (tokenValue: string): Promise<void> =>
  storeToken(TokenNames.JWT_REFRESH, tokenValue);

export const getJwtRefreshToken = async (): Promise<string | null> =>
  getToken(TokenNames.JWT_REFRESH);

export const clearJwtRefreshToken = async (): Promise<boolean> =>
  clearToken(TokenNames.JWT_REFRESH);

// USER PASSWORD

export const storeUserPassword = async (password: string): Promise<void> =>
  storeToken(TokenNames.USER_PASSWORD, password);

export const getUserPassword = async (): Promise<string | null> =>
  getToken(TokenNames.USER_PASSWORD);

export const clearUserPassword = async (): Promise<boolean> =>
  clearToken(TokenNames.USER_PASSWORD);

// USER PRIVATE KEY

export const storeUserPrivateKey = async (
  privateKey: string,
  userId: number,
): Promise<void> => {
  const prevStateString = await getToken(TokenNames.USER_PRIVATE_KEY);
  const prevState: {[userId: number]: string} | null = prevStateString
    ? JSON.parse(prevStateString)
    : null;

  if (prevState) {
    prevState[userId] = privateKey;
  }

  const value = prevState ? prevState : {[userId]: privateKey};
  await storeToken(TokenNames.USER_PRIVATE_KEY, JSON.stringify(value));
};

export const getUserPrivateKey = async (
  userId: number,
): Promise<string | null> => {
  const prevStateString = await getToken(TokenNames.USER_PRIVATE_KEY);
  const prevState: {[userId: number]: string} | null = prevStateString
    ? JSON.parse(prevStateString)
    : null;

  return prevState ? prevState[userId] : null;
};

// USER ACCOUNT ADDRESS

export const storeUserAccountAddress = async (
  accountAddress: string,
  userId: number,
): Promise<void> => {
  const prevStateString = await getToken(TokenNames.USER_ACCOUNT_ADDRESS);
  const prevState: {[userId: number]: string} | null = prevStateString
    ? JSON.parse(prevStateString)
    : null;

  if (prevState) {
    prevState[userId] = accountAddress;
  }

  const value = prevState ? prevState : {[userId]: accountAddress};
  await storeToken(TokenNames.USER_ACCOUNT_ADDRESS, JSON.stringify(value));
};

export const getUserAccountAddress = async (
  userId: number,
): Promise<string | null> => {
  const prevStateString = await getToken(TokenNames.USER_ACCOUNT_ADDRESS);
  const prevState: {[userId: number]: string} | null = prevStateString
    ? JSON.parse(prevStateString)
    : null;

  return prevState ? prevState[userId] : null;
};

// USER PGP PRIVATE KEY

export const storeUserPgpPrivateKey = async (
  privateKey: string,
  userId: number,
): Promise<void> => {
  const prevStateString = await getToken(TokenNames.USER_PGP_PRIVATE_KEY);
  const prevState: {[userId: number]: string} | null = prevStateString
    ? JSON.parse(prevStateString)
    : null;

  if (prevState) {
    prevState[userId] = privateKey;
  }

  const value = prevState ? prevState : {[userId]: privateKey};
  await storeToken(TokenNames.USER_PGP_PRIVATE_KEY, JSON.stringify(value));
};

export const getUserPgpPrivateKey = async (
  userId: number,
): Promise<string | null> => {
  const prevStateString = await getToken(TokenNames.USER_PGP_PRIVATE_KEY);
  const prevState: {[userId: number]: string} | null = prevStateString
    ? JSON.parse(prevStateString)
    : null;

  return prevState ? prevState[userId] : null;
};

export const clearJWTTokens = () =>
  Promise.allSettled([clearJwtAccessToken(), clearJwtRefreshToken()]);
