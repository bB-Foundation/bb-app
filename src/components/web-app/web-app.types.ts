import {WebAppEvents} from './web-app.api';

type DeployAccountData = {
  accountAddress: string;
  publicKey: string;
  fullPublicKey: string;
  privateKey: string;
  encryptedPrivateKey: string;
  accessToken: string;
  baseApiUrl: string;
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

export type Events =
  | CreateAccountEvent
  | DeployAccountEvent
  | JoinQuestEvent
  | FinishQuestTaskEvent
  | SwapLoomiEvent;

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
