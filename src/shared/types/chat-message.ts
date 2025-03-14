import User from './user';

export type ChatMessage = {
  id: number;
  text: string;
  createdAt: string;
  roomId: number;
  creator: User;
};
