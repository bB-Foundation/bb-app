import React, {FC} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Layout, useStyleSheet, Text} from '@ui-kitten/components';

import rootStyles from './restore-password-verification.styles';
import {
  useButtonHandlers,
  useFormLogic,
} from './restore-password-verification.hooks';
import CodeField from './components/code-field';

const RestorePasswordVerification: FC = () => {
  const {exitToSignIn} = useButtonHandlers();

  const {verificationCode, setVerificationCode, onSubmit} = useFormLogic();

  const styles = useStyleSheet(rootStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          bB
        </Text>
        <Text style={styles.headerLabel} category="s1" status="control">
          Restore Password
        </Text>
      </View>

      <Layout style={styles.formContainer} level="1">
        <Text category="h6" style={styles.emailLabel}>
          Please enter the 6-digit code
        </Text>

        <CodeField value={verificationCode} setValue={setVerificationCode} />
      </Layout>

      <Button style={styles.submitButton} size="giant" onPress={onSubmit}>
        VERIFY
      </Button>

      <Button
        style={styles.goBackButton}
        appearance="ghost"
        status="basic"
        onPress={exitToSignIn}>
        Exit
      </Button>
    </SafeAreaView>
  );
};

export default RestorePasswordVerification;
