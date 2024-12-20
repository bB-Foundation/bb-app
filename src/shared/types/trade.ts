import {Nullable} from './tools';

export enum TradeStatus {
  PENDING = 'pending', // Trade is initialized by User 1 and awaiting User 2's response
  ACCEPTED = 'accepted', // Trade is accepted by User 2 and ready for signature
  WAITING_SIGNATURE = 'waiting_signature', // Waiting for User 2's signature
  SIGNED = 'signed', // Both users have signed the trade
  ON_CHAIN = 'on_chain', // Trade has been submitted to the blockchain
  FINISHED = 'finished', // Trade is completed
  CANCELLED = 'canceled', // Trade is canceled by any party
}

export type Trade = {
  id: number;
  initiatorId: number;
  receiverId: number;
  initiatorGemIds: number[];
  receiverGemIds: number[];
  status: TradeStatus;
  txHash: Nullable<string>;
};
