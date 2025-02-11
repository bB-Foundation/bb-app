import User from './user';

export type ChatRoom = {
  id: number;
  name: string;
  groupPgpPublicKey: string;
  type: RoomType;
  participants: User[];
};

export enum RoomType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
}
