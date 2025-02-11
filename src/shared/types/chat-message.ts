import User from './user';

export type ChatMessage = {
  id: number;
  text: string;
  createdAt: string;
  creator: User;
};
