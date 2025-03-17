import {io, Socket} from 'socket.io-client';

import {getJwtAccessToken} from '../utils/secure-storage';

const tradingSocket = io(
  `${process.env.BACKEND_API_URL}:${process.env.BACKEND_API_PORT}`,
);

let chatSocket: Socket | null = null;

export const getTradingSocket = () => tradingSocket;

export const initializeTradingSocket = async () => {
  if (tradingSocket.disconnected) {
    tradingSocket.connect();
    tradingSocket.on('connect', tradingSocketAuth);
  } else {
    await tradingSocketAuth();
  }

  return tradingSocket;
};

const tradingSocketAuth = async () => {
  const accessToken = await getJwtAccessToken();
  tradingSocket.emit('auth', accessToken);
};

export const getChatSocket = (): Socket => {
  if (!chatSocket) throw new Error('Chat socket is not defined');
  return chatSocket;
};

export const initializeChatSocket = async (): Promise<Socket> => {
  const accessToken = await getJwtAccessToken();
  chatSocket = io(
    `${process.env.BACKEND_API_URL}:${process.env.BACKEND_WS_TRADE_CHAT_PORT}`,
    {extraHeaders: {authorization: 'Bearer ' + accessToken}},
  );
  return chatSocket;
};

export const closeAllSockets = () => {
  tradingSocket.close();
  chatSocket && chatSocket.close();
};
