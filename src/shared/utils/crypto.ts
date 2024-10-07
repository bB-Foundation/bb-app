import Aes from 'react-native-aes-crypto';

type EncryptedData = {
  cipher: string;
  iv: string;
};

const generateKey = (password: string): Promise<string> =>
  Aes.pbkdf2(password, 'salt', 5000, 256, 'sha256');

export const combineCipherAndIV = ({cipher, iv}: EncryptedData): string => {
  return `${cipher}:${iv}`;
};

export const splitCipherAndIV = (combined: string): EncryptedData => {
  const [cipher, iv] = combined.split(':');
  return {cipher, iv};
};

export const encryptData = async (
  text: string,
  key: string,
): Promise<string> => {
  const cryptographicKey = await generateKey(key);
  const iv = await Aes.randomKey(16);
  const cipher = await Aes.encrypt(text, cryptographicKey, iv, 'aes-256-cbc');

  return combineCipherAndIV({cipher, iv});
};

export const decryptData = async (
  encryptedText: string,
  key: string,
): Promise<string> => {
  const {cipher, iv} = splitCipherAndIV(encryptedText);
  const cryptographicKey = await generateKey(key);
  return Aes.decrypt(cipher, cryptographicKey, iv, 'aes-256-cbc');
};
