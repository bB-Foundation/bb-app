import React, {FC} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

import {ImageOverlayProps} from './image-overlay.types';

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.45)';

const ImageOverlay: FC<ImageOverlayProps> = ({
  style,
  children,
  ...imageBackgroundProps
}) => {
  const {overlayColor, ...imageBackgroundStyle} = StyleSheet.flatten(style);

  return (
    <ImageBackground {...imageBackgroundProps} style={imageBackgroundStyle}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR},
        ]}
      />
      {children}
    </ImageBackground>
  );
};

export default ImageOverlay;
