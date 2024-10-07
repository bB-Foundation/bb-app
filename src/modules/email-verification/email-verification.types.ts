export type Web3AccountData = {
  accountAddress: string;
  publicKey: string;
  fullPublicKey: string;
  privateKey: string;
};

export type DeployAccountData = Web3AccountData & DeployAccountAdditionalData;

export type DeployAccountAdditionalData = {
  accessToken: string;
  encryptedPrivateKey: string;
  baseApiUrl: string;
};
