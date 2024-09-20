import React from 'react';
import {StyleSheet} from 'react-native';
import {ErrorToast, ToastProps} from 'react-native-toast-message';

export default {
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={0}
      style={styles.container}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    borderLeftColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text1Style: {fontSize: 18},
  text2Style: {fontSize: 16, marginTop: 5},
});
