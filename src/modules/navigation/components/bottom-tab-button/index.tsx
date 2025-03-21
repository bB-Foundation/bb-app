import React, {FC} from 'react';
import {Pressable} from 'react-native';

import {useHandlers} from './bottom-tab-button.hooks';
import {BottomTabButtonProps} from './bottom-tab-button.types';

export const BottomTabButton: FC<BottomTabButtonProps> = ({
  bottomTabBarButtonProps,
}) => {
  const {handleOnPress} = useHandlers({bottomTabBarButtonProps});

  return <Pressable {...bottomTabBarButtonProps} onPress={handleOnPress} />;
};
