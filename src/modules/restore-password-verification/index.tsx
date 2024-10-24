import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Layout, useStyleSheet, Text} from '@ui-kitten/components';

import rootStyles from './restore-password-verification.styles';
import {
  useButtonHandlers,
  useFormLogic,
  useResendEmail,
} from './restore-password-verification.hooks';
import MailIcon from '../../assets/images/subscribe.svg';
import Page from 'components/page';
import CodeField from 'components/forms/code-field';
import {ResendEmailTimer} from './components/resend-email-timer';

const RestorePasswordVerification: FC = () => {
  const {exitToSignIn} = useButtonHandlers();

  const {
    verificationCode,
    isValidVerificationCode,
    isSubmitting,
    setVerificationCode,
    onSubmit,
  } = useFormLogic();

  const styles = useStyleSheet(rootStyles);

  const {isResendEmailUsed, resendEmailHandler, onResendEmailTimerEnd} =
    useResendEmail();

  return (
    <Page>
      <View style={styles.container}>
        <View>
          <View style={styles.iconWrapper}>
            <MailIcon width="80%" height="100%" />
          </View>

          <Text style={styles.headerLabel} category="h2" status="control">
            Restore Password
          </Text>

          <Layout style={styles.formContainer} level="1">
            <Text category="h6" style={styles.emailLabel}>
              Please enter the 6-digit code
            </Text>

            <CodeField
              value={verificationCode}
              setValue={setVerificationCode}
            />

            {isResendEmailUsed ? (
              <ResendEmailTimer onFinishCb={onResendEmailTimerEnd} />
            ) : (
              <Button
                appearance="ghost"
                status="basic"
                onPress={resendEmailHandler}
                disabled={isSubmitting}
                testID="resend-verification-code-button">
                Resend verification code
              </Button>
            )}
          </Layout>
        </View>

        <View>
          <Button
            style={styles.submitButton}
            size="giant"
            onPress={onSubmit}
            disabled={!isValidVerificationCode || isSubmitting}
            testID="submit-button">
            VERIFY
          </Button>

          <Button
            style={styles.goBackButton}
            appearance="ghost"
            status="basic"
            onPress={exitToSignIn}
            testID="exit-button">
            Exit
          </Button>
        </View>
      </View>
    </Page>
  );
};

export default RestorePasswordVerification;
