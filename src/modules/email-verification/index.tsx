import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Layout, useStyleSheet, Text} from '@ui-kitten/components';
import WebView from 'react-native-webview';

import rootStyles from './email-verification.styles';
import {
  useButtonHandlers,
  useCreateWallet,
  useFormLogic,
} from './email-verification.hooks';
import MailIcon from '../../assets/images/subscribe.svg';
import Page from 'components/page';
import webApp from './components/web-app';
import {VerificationCodeField} from './components/verification-code-field';
import {SubmitButton} from './components/submit-button';
import {ResendEmailTimer} from './components/resend-email-timer';

const EmailVerification: FC = () => {
  const {isResendEmailUsed, isSubmitting, onSubmit} = useFormLogic();

  const {resendEmailVerificationHandler, exitToSignIn, onResendEmailTimerEnd} =
    useButtonHandlers();

  const {webBrowserRef, onWebBrowserMessage} = useCreateWallet();

  const styles = useStyleSheet(rootStyles);

  return (
    <Page>
      <WebView
        ref={webBrowserRef}
        source={{html: webApp}}
        onMessage={onWebBrowserMessage}
      />

      <View style={styles.container}>
        <View>
          <View style={styles.iconWrapper}>
            <MailIcon width="80%" height="100%" />
          </View>

          <Text style={styles.headerLabel} category="h2" status="control">
            Verify Email
          </Text>

          <Layout style={styles.formContainer} level="1">
            <Text category="h6" style={styles.emailLabel}>
              Please enter the 6-digit code
            </Text>

            <VerificationCodeField />

            {isResendEmailUsed ? (
              <ResendEmailTimer onFinishCb={onResendEmailTimerEnd} />
            ) : (
              <Button
                appearance="ghost"
                status="basic"
                onPress={resendEmailVerificationHandler}
                disabled={isSubmitting}
                testID="resend-verification-code-button">
                Resend verification code
              </Button>
            )}
          </Layout>
        </View>

        <View>
          <SubmitButton onSubmit={onSubmit} />

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

export default EmailVerification;
