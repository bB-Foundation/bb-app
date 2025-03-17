import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
  chat: {chatRoomId: number; groupPgpPublicKey: string; title: string};
};

export type ProfileStackParamList = {
  'profile-main': undefined;
  friends: undefined;
  'friends-chat': {
    chatRoomId: number;
    groupPgpPublicKey: string;
  };
};

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList &
    QuestsStackParamList &
    QrCodeStackParamList &
    SwapStackParamList &
    TradeStackParamList &
    ProfileStackParamList
>;
