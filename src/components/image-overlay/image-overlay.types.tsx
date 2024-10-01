import {ImageBackgroundProps, StyleProp, ViewStyle} from 'react-native';

export interface OverlayImageStyle extends ViewStyle {
  overlayColor?: any;
}

export interface ImageOverlayProps extends ImageBackgroundProps {
  style?: StyleProp<OverlayImageStyle>;
  children?: React.ReactNode;
}
