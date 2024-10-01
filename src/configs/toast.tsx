import React from 'react';
import {StyleSheet} from 'react-native';
import {SuccessToast, ErrorToast, ToastProps} from 'react-native-toast-message';

export default {
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      text2NumberOfLines={0}
      style={{...styles.commonContainer, ...styles.successContainer}}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={0}
      style={{...styles.commonContainer, ...styles.errorContainer}}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  ),
};

const styles = StyleSheet.create({
  commonContainer: {
    height: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  errorContainer: {
    borderLeftColor: 'red',
  },
  successContainer: {
    borderLeftColor: 'green',
  },
  text1Style: {fontSize: 18},
  text2Style: {fontSize: 16, marginTop: 5},
});
