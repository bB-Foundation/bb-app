import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Socket} from 'socket.io-client';

export type RootStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
  'restore-password-verification': {email: string};
  'restore-password': {verificationCode: string};
  'restore-password-congrats': undefined;
  'email-verification': {email: string};
  'new-account-congrats': undefined;
  main: undefined;
};

export type QuestsStackParamList = {
  'quests-list': undefined;
  quest: {
    questId: number;
  };
  'quest-chat': {
    title: string;
    socket: Socket;
    chatRoomId: number;
    groupPgpPublicKey: string;
  };
};

export type QrCodeStackParamList = {
  'qr-scanner-camera': undefined;
  'check-quest-task-qr-code': {
    questId: number;
    taskId: number;
    taskCode: string;
  };
};

export type SwapStackParamList = {
  main: undefined;
};

export type TradeStackParamList = {
  main: undefined;
  chat: {isInitiator: boolean; title: string};
};

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList &
    QuestsStackParamList &
    QrCodeStackParamList &
    SwapStackParamList &
    TradeStackParamList
>;
