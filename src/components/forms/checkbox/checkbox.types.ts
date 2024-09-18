import {ReactNode} from 'react';
import {
  CheckBoxProps as KittenCheckBoxProps,
  TextProps,
} from '@ui-kitten/components';

export type CheckBoxProps = {
  name: string;
  children: (props: TextProps | undefined) => ReactNode;
} & KittenCheckBoxProps;
