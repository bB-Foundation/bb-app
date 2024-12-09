import {
  CallData,
  ec,
  encode,
  hash,
  stark,
  Signer,
  TypedData,
  WeierstrassSignatureType,
  ProviderInterface,
  DeployAccountContractPayload,
  Account,
  Call,
} from 'starknet';
import {get} from 'lodash';

export enum WebAppEvents {
  'CREATE_ACCOUNT' = 'CREATE_ACCOUNT',
  'CREATE_ACCOUNT_RESULT' = 'CREATE_ACCOUNT_RESULT',
  'DEPLOY_ACCOUNT' = 'DEPLOY_ACCOUNT',
  'DEPLOY_ACCOUNT_RESULT' = 'DEPLOY_ACCOUNT_RESULT',
  'FINISH_QUEST_TASK' = 'FINISH_QUEST_TASK',
  'FINISH_QUEST_TASK_RESULT' = 'FINISH_QUEST_TASK_RESULT',
  'JOIN_QUEST' = 'JOIN_QUEST',
  'JOIN_QUEST_RESULT' = 'JOIN_QUEST_RESULT',
  'SWAP_LOOMI' = 'SWAP_LOOMI',
  'SWAP_LOOMI_RESULT' = 'SWAP_LOOMI_RESULT',
}

export const web3Data = {
  argentXaccountClassHash:
    '0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003',
  name: 'bBApp',
  chainId: 'SN_SEPOLIA',
  version: '0.0.1',
  nodeUrl:
    'https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/InWtKkBR8TTaiQTtcu_KR1i0e64V_vBl',
};

export const createAccount = (accountClassHash: string) => {
  const privateKey = stark.randomAddress();
  const publicKey = ec.starkCurve.getStarkKey(privateKey);
  const fullPublicKey = encode.addHexPrefix(
    encode.buf2hex(ec.starkCurve.getPublicKey(privateKey, false)),
  );

  const ConstructorCallData = CallData.compile({
    owner: publicKey,
    guardian: '0',
  });
  const accountAddress = hash.calculateContractAddressFromHash(
    publicKey,
    accountClassHash,
    ConstructorCallData,
    0,
  );

  return {accountAddress, publicKey, fullPublicKey, privateKey};
};

export const signMessage = async (
  privateKey: string,
  messageStructure: TypedData,
): Promise<string> => {
  const starknetPublicKey = ec.starkCurve.getStarkKey(privateKey);
  const signer = new Signer(privateKey);

  try {
    const signature = (await signer.signMessage(
      messageStructure,
      starknetPublicKey,
    )) as WeierstrassSignatureType;
    return signature.toCompactHex();
  } catch (error) {
    console.error('Error signing the message:', error);
    throw error;
  }
};

export const generateMessage = (
  accountAddress: string,
  encryptedPrivateKey: string,
): TypedData => ({
  types: {
    StarkNetDomain: [
      {name: 'name', type: 'felt'},
      {name: 'chainId', type: 'felt'},
      {name: 'version', type: 'felt'},
    ],
    Message: [
      {name: 'accountAddress', type: 'felt'},
      {name: 'encryptedPrivateKeyHash', type: 'felt'},
    ],
  },
  primaryType: 'Message',
  domain: {
    name: web3Data.name,
    chainId: web3Data.chainId,
    version: web3Data.version,
  },
  message: {
    accountAddress,
    encryptedPrivateKeyHash: hash.starknetKeccak(encryptedPrivateKey),
  },
});

export const deployAccount = async (
  provider: ProviderInterface,
  privateKey: string,
  deployAccountPayload: DeployAccountContractPayload,
): Promise<{
  txHash: string;
  accountAddress: string;
  account: Account;
}> => {
  if (!deployAccountPayload.contractAddress)
    throw new Error('No contract address');

  const account = new Account(
    provider,
    deployAccountPayload.contractAddress,
    privateKey,
  );

  const {transaction_hash: txHash, contract_address: accountAddress} =
    await account.deployAccount(deployAccountPayload);

  return {txHash, accountAddress, account};
};

export const calculateMaxFee = async ({
  account,
  TX,
}: {
  account: Account;
  TX: Call;
}) => {
  const feeEstimate = await account.estimateFee([TX]);
  const buffer = BigInt(200);
  return feeEstimate.overall_fee * buffer;
};

export const isErrorMessage = (message: unknown): boolean =>
  Boolean(get(message, 'data.error'));
