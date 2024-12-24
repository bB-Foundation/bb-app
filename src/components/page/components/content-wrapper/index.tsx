import React, {FC, useContext} from 'react';
import {Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BottomTabBarHeightContext} from '@react-navigation/bottom-tabs';

import styles from './content-wrapper.styles';
import {ContentWrapperProps} from './content-wrapper.types';

const ContentWrapper: FC<ContentWrapperProps> = ({children}) => {
  const tabBarHeight = useContext(BottomTabBarHeightContext) ?? 0;

  const extraScrollHeight = tabBarHeight === 0 ? 30 : -tabBarHeight;

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={Platform.OS === 'android'}
      style={styles.keyboardAvoidingView}
      contentContainerStyle={styles.keyboardAvoidingView}
      bounces={false}
      contentInsetAdjustmentBehavior="always"
      overScrollMode="always"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
      enableAutomaticScroll
      extraScrollHeight={extraScrollHeight}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default ContentWrapper;
