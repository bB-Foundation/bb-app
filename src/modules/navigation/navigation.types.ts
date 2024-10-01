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
  quests: undefined;
  quest: {questId: number};
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
