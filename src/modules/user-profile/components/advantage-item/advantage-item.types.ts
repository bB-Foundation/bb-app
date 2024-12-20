import {ReactNode} from 'react';
import {ViewProps} from 'react-native';

export interface ProfileSocialProps extends ViewProps {
  hint: string;
  value: ReactNode;
}
