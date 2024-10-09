import React, {FC} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

import styles from './content-wrapper.styles';
import {ContentWrapperProps} from './content-wrapper.types';

const ContentWrapper: FC<ContentWrapperProps> = ({children}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      style={styles.keyboardAvoidingView}
      contentContainerStyle={styles.keyboardAvoidingView}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ContentWrapper;
