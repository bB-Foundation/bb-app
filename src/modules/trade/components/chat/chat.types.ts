import {Socket} from 'socket.io-client';

export type ChatProps = {
  chatSocket: Socket;
  chatRoomId: number;
  groupPgpPublicKey: string;
};

export type MessageFilters = {
  roomId: number;
  first?: number;
  rows?: number;
  filter?: string;
};
