import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
  'restore-password-verification': undefined;
  'restore-password': {verificationCode: string};
  'restore-password-congrats': undefined;
  'email-verification': {email: string};
  'new-account-congrats': undefined;
  main: undefined;
  'quests-filters-modal': undefined;
};

export type QuestsStackParamList = {
  'quests-list': undefined;
  quest: {
    questId: number;
  };
};

export type QrCodeStackParamList = {
  'qr-scanner-camera': undefined;
  'check-milestone-qr-code': {
    milestoneUuid: string;
  };
};

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList & QuestsStackParamList & QrCodeStackParamList
>;
