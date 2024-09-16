import React, {FC} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Layout, useStyleSheet, Text} from '@ui-kitten/components';

import rootStyles from './email-verification.styles';
import {useButtonHandlers, useFormLogic} from './email-verification.hooks';
import CodeField from '../../components/code-field';
import MailIcon from '../../assets/images/subscribe.svg';

const EmailVerification: FC = () => {
  const {
    verificationCode,
    isValidVerificationCode,
    isSubmitting,
    setVerificationCode,
    onSubmit,
    resendEmailVerification,
  } = useFormLogic();

  const {exitToSignIn} = useButtonHandlers();

  const styles = useStyleSheet(rootStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconWrapper}>
        <MailIcon width="80%" height="100%" />
      </View>

      <Text style={styles.headerLabel} category="h2" status="control">
        Verify {'\n'}Email
      </Text>

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
        disabled={!isValidVerificationCode || isSubmitting}>
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
