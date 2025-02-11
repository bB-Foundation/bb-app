import {WebAppEvents} from './web-app.api';

type DeployAccountData = {
  accountAddress: string;
  publicKey: string;
  fullPublicKey: string;
  privateKey: string;
  encryptedPrivateKey: string;
  accessToken: string;
  baseApiUrl: string;
  pgpPublicKey: string;
};

type JoinQuestData = {
  questAddress: string;
  accountAddress: string;
  privateKey: string;
};

type FinishQuestTaskData = {
  taskId: number;
  taskCode: string;
  questAddress: string;
  accountAddress: string;
  privateKey: string;
};

type SwapLoomiData = {
  privateKey: string;
  accountAddress: string;
  tokenIds: number[];
};

type GenerateSignatureData = {
  privateKey: string;
};

export type Events =
  | CreateAccountEvent
  | DeployAccountEvent
  | JoinQuestEvent
  | FinishQuestTaskEvent
  | SwapLoomiEvent
  | GenerateSignatureEvent;

export type CreateAccountEvent = {
  type: WebAppEvents.CREATE_ACCOUNT;
  data: undefined;
};

export type DeployAccountEvent = {
  type: WebAppEvents.DEPLOY_ACCOUNT;
  data: DeployAccountData;
};

export type JoinQuestEvent = {
  type: WebAppEvents.JOIN_QUEST;
  data: JoinQuestData;
};

export type FinishQuestTaskEvent = {
  type: WebAppEvents.FINISH_QUEST_TASK;
  data: FinishQuestTaskData;
};

export type SwapLoomiEvent = {
  type: WebAppEvents.SWAP_LOOMI;
  data: SwapLoomiData;
};

export type GenerateSignatureEvent = {
  type: WebAppEvents.GENERATE_SIGNATURE;
  data: GenerateSignatureData & TradeSignaturePayload;
};

export type TradeSignaturePayload = {
  initiatorId: number;
  receiverId: number;
  initiatorGemIds: string[];
  receiverGemIds: string[];
};
