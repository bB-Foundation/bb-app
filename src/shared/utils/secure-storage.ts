import * as Keychain from 'react-native-keychain';

enum TokenNames {
  JWT_ACCESS = 'JWT_ACCESS',
  JWT_REFRESH = 'JWT_REFRESH',
  USER_PASSWORD = 'USER_PASSWORD',
  USER_PRIVATE_KEY = 'USER_PRIVATE_KEY',
}

const storeToken = async (tokenName: string, tokenValue: string) => {
  try {
    await Keychain.setGenericPassword(tokenName, tokenValue, {
      service: tokenName,
    });
  } catch (error) {
    throw error;
  }
};

const getToken = async (tokenName: string) => {
  try {
    const credentials = await Keychain.getGenericPassword({service: tokenName});
    if (credentials) {
      return credentials.password;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const clearToken = (tokenName: string) =>
  Keychain.resetGenericPassword({service: tokenName});

export const storeJwtAccessToken = async (tokenValue: string) => {
  try {
    await storeToken(TokenNames.JWT_ACCESS, tokenValue);
  } catch (error) {
    throw error;
  }
};

export const getJwtAccessToken = async () => {
  try {
    return await getToken(TokenNames.JWT_ACCESS);
  } catch (error) {
    throw error;
  }
};

export const clearJwtAccessToken = async () =>
  clearToken(TokenNames.JWT_ACCESS);

export const storeJwtRefreshToken = async (tokenValue: string) => {
  try {
    await storeToken(TokenNames.JWT_REFRESH, tokenValue);
  } catch (error) {
    throw error;
  }
};

export const getJwtRefreshToken = async () => {
  try {
    return await getToken(TokenNames.JWT_REFRESH);
  } catch (error) {
    throw error;
  }
};

export const clearJwtRefreshToken = async () =>
  clearToken(TokenNames.JWT_REFRESH);

export const storeUserPassword = async (password: string) => {
  try {
    await storeToken(TokenNames.USER_PASSWORD, password);
  } catch (error) {
    throw error;
  }
};

export const getUserPassword = async () => {
  try {
    return await getToken(TokenNames.USER_PASSWORD);
  } catch (error) {
    throw error;
  }
};

export const clearUserPassword = async () =>
  clearToken(TokenNames.USER_PASSWORD);

export const storeUserPrivateKey = async (privateKey: string) => {
  try {
    await storeToken(TokenNames.USER_PRIVATE_KEY, privateKey);
  } catch (error) {
    throw error;
  }
};

export const getUserPrivateKey = async () => {
  try {
    return await getToken(TokenNames.USER_PRIVATE_KEY);
  } catch (error) {
    throw error;
  }
};

export const clearUserPrivateKey = async () =>
  clearToken(TokenNames.USER_PRIVATE_KEY);

export const clearSecureStorage = () =>
  Promise.all([
    clearJwtAccessToken(),
    clearJwtRefreshToken(),
    clearUserPassword(),
    clearUserPrivateKey(),
  ]);
