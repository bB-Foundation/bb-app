import React, {FC, ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyleSheet} from '@ui-kitten/components';

import rootStyles from './page.styles';

type Props = {children: ReactNode};

const Page: FC<Props> = ({children}) => {
  const styles = useStyleSheet(rootStyles);

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

export default Page;
