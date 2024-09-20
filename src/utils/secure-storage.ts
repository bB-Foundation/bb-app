import * as Keychain from 'react-native-keychain';

enum TokenNames {
  JWT_ACCESS = 'JWT_ACCESS',
  JWT_REFRESH = 'JWT_REFRESH',
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
