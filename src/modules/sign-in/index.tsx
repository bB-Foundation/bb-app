import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Layout, Text, useStyleSheet, Icon} from '@ui-kitten/components';
import {FormProvider} from 'react-hook-form';

import {signInStyles} from './sign-in.styles';
import {
  useButtonHandlers,
  useFormLogic,
  useIsPasswordVisible,
} from './sign-in.hooks';
import LogInIcon from '../../assets/images/sign-in/login.svg';
import Page from 'components/page';
import { Input } from 'components/forms/input';

const SignIn: FC = () => {
  const {formData, isSubmitting, submitHandler} = useFormLogic();

  const {isPasswordVisible, togglePasswordVisibility} = useIsPasswordVisible();

  const styles = useStyleSheet(signInStyles);

  const {onSignUpButtonPress, onForgotPasswordButtonPress} =
    useButtonHandlers();

  return (
    <Page>
      <View style={styles.container}>
        <View>
          <View style={styles.iconWrapper}>
            <LogInIcon width="100%" height="100%" />
          </View>

          <Text style={styles.signInLabel} category="h2" status="control">
            Login
          </Text>

          <FormProvider {...formData}>
            <Layout style={styles.formContainer} level="1">
              <Input
                name="email"
                placeholder="Email"
                accessoryRight={<Icon name="email" />}
                autoCapitalize="none"
              />
              <Input
                name="password"
                style={styles.passwordInput}
                placeholder="Password"
                accessoryRight={
                  <Icon
                    onPress={togglePasswordVisibility}
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    testID="toggle-password-visibility-button"
                  />
                }
                secureTextEntry={!isPasswordVisible}
              />

              <View style={styles.forgotPasswordContainer}>
                <Button
                  style={styles.forgotPasswordButton}
                  appearance="ghost"
                  status="basic"
                  onPress={onForgotPasswordButtonPress}
                  testID="forgot-password-button">
                  Forgot your password?
                </Button>
              </View>
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
            SIGN IN
          </Button>

          <Button
            style={styles.signUpButton}
            appearance="ghost"
            status="basic"
            onPress={onSignUpButtonPress}
            testID="sign-up-button">
            Don't have an account? Create
          </Button>
        </View>
      </View>
    </Page>
  );
};

export default SignIn;
