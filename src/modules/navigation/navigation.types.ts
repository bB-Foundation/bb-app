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
};

export type QrCodeStackParamList = {
  'qr-scanner-camera': undefined;
  'check-quest-task-qr-code': {
    questTaskId: number;
  };
};

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList & QuestsStackParamList & QrCodeStackParamList
>;
