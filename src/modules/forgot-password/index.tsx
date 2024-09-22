import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Layout, useStyleSheet, Text, Icon} from '@ui-kitten/components';
import {FormProvider} from 'react-hook-form';

import {ForgotPasswordStyles} from './forgot-password.styles';
import {useButtonHandlers, useFormLogic} from './forgot-password.hooks';
import {Input} from '../../components/forms/input';
import ForgotPasswordIcon from '../../assets/images/forgot-password/forgot-password.svg';
import Page from '../../components/page';

const ForgotPassword: FC = () => {
  const {formData, isSubmitting, submitHandler} = useFormLogic();

  const styles = useStyleSheet(ForgotPasswordStyles);

  const {goBack} = useButtonHandlers();

  return (
    <Page>
      <View style={styles.container}>
        <View>
          <View style={styles.iconWrapper}>
            <ForgotPasswordIcon width="80%" height="100%" />
          </View>

          <Text style={styles.headerLabel} category="h2" status="control">
            Forgot Password?
          </Text>

          <FormProvider {...formData}>
            <Layout style={styles.formContainer} level="1">
              <Text category="h6" style={styles.emailLabel}>
                Just enter your email address, and we'll send you a link to
                reset your password
              </Text>

              <Input
                name="email"
                style={styles.emailInput}
                autoCapitalize="none"
                placeholder="Email"
                accessoryRight={<Icon name="email" />}
              />
            </Layout>
          </FormProvider>
        </View>

        <View>
          <Button
            style={styles.submitButton}
            size="giant"
            onPress={submitHandler}
            disabled={isSubmitting}
            testID="submit-button">
            SEND VERIFICATION CODE
          </Button>

          <Button
            style={styles.goBackButton}
            appearance="ghost"
            status="basic"
            onPress={goBack}
            testID="go-back-button">
            Go back
          </Button>
        </View>
      </View>
    </Page>
  );
};

export default ForgotPassword;
