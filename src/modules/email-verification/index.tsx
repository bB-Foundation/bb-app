import React, {FC} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Layout, useStyleSheet, Text} from '@ui-kitten/components';

import rootStyles from './email-verification.styles';
import {useButtonHandlers, useFormLogic} from './email-verification.hooks';
import CodeField from '../../components/code-field';

const EmailVerification: FC = () => {
  const {
    verificationCode,
    isValidVerificationCode,
    setVerificationCode,
    onSubmit,
    resendEmailVerification,
  } = useFormLogic();

  const {exitToSignIn} = useButtonHandlers();

  const styles = useStyleSheet(rootStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          bB
        </Text>
        <Text style={styles.headerLabel} category="s1" status="control">
          Verify Email
        </Text>
      </View>

      <Layout style={styles.formContainer} level="1">
        <Text category="h6" style={styles.emailLabel}>
          Please enter the 6-digit code
        </Text>

        <CodeField value={verificationCode} setValue={setVerificationCode} />

        <Button
          appearance="ghost"
          status="basic"
          onPress={resendEmailVerification}>
          Resend verification code
        </Button>
      </Layout>

      <Button
        style={styles.submitButton}
        size="giant"
        onPress={onSubmit}
        disabled={!isValidVerificationCode}>
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

export default EmailVerification;
