import {ChatMessage} from './chat-message';
import {Nullable} from './tools';
import User from './user';

export type ChatRoom = {
  id: number;
  name: string;
  groupPgpPublicKey: string;
  type: RoomType;
  participants: User[];
  createdBy: number;
  updatedBy: number;
  lastMessage: Nullable<ChatMessage>;
};

export enum RoomType {
  DIRECT = 'direct',
  TRADE = 'trade',
  GROUP = 'group',
}
