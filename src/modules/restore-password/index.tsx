import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Layout, Text, useStyleSheet, Icon} from '@ui-kitten/components';
import {FormProvider} from 'react-hook-form';

import {Input} from '../../components/forms/input';
import {restorePasswordStyles} from './restore-password.styles';
import {
  useButtonHandlers,
  useFormLogic,
  useIsPasswordVisible,
} from './restore-password.hooks';
import RestorePasswordIcon from '../../assets/images/restore-password/typewriter.svg';
import Page from '../../components/page';

const RestorePassword: FC = () => {
  const {formData, isSubmitting, submitHandler} = useFormLogic();

  const {isPasswordVisible, togglePasswordVisibility} = useIsPasswordVisible();

  const styles = useStyleSheet(restorePasswordStyles);

  const {exitToSignIn} = useButtonHandlers();

  return (
    <Page>
      <View style={styles.container}>
        <View>
          <View style={styles.iconWrapper}>
            <RestorePasswordIcon width="80%" height="100%" />
          </View>

          <Text style={styles.headerLabel} category="h2" status="control">
            Restore Password
          </Text>

          <FormProvider {...formData}>
            <Layout style={styles.formContainer} level="1">
              <Text category="h6" style={styles.hintLabel}>
                Please enter your new password
              </Text>

              <Input
                name="password"
                style={styles.passwordInput}
                placeholder="New Password"
                accessoryRight={
                  <Icon
                    onPress={togglePasswordVisibility}
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    testID="toggle-password-visibility-button"
                  />
                }
                secureTextEntry={!isPasswordVisible}
              />
            </Layout>
          </FormProvider>
        </View>

        <View>
          <Button
            style={styles.signInButton}
            size="giant"
            onPress={submitHandler}
            disabled={isSubmitting}
            testID="submit-button">
            RESTORE PASSWORD
          </Button>

          <Button
            style={styles.signUpButton}
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

export default RestorePassword;
