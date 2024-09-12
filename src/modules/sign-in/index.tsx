import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Layout, Text, useStyleSheet, Icon} from '@ui-kitten/components';
import {FormProvider} from 'react-hook-form';

import {Input} from '../../components/input';
import {signInStyles} from './sign-in.styles';
import {
  useButtonHandlers,
  useFormLogic,
  useIsPasswordVisible,
} from './ sign-in.hooks';

const SignIn: FC = () => {
  const {formData, submitHandler} = useFormLogic();

  const {isPasswordVisible, togglePasswordVisibility} = useIsPasswordVisible();

  const styles = useStyleSheet(signInStyles);

  const {onSignUpButtonPress, onForgotPasswordButtonPress} =
    useButtonHandlers();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          Hello
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          Sign in to your account
        </Text>
      </View>

      <FormProvider {...formData}>
        <Layout style={styles.formContainer} level="1">
          <Input
            name="email"
            placeholder="Email"
            accessoryRight={<Icon name="person" />}
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
              />
            }
            secureTextEntry={!isPasswordVisible}
          />

          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance="ghost"
              status="basic"
              onPress={onForgotPasswordButtonPress}>
              Forgot your password?
            </Button>
          </View>
        </Layout>
      </FormProvider>

      <Button style={styles.signInButton} size="giant" onPress={submitHandler}>
        SIGN IN
      </Button>

      <Button
        style={styles.signUpButton}
        appearance="ghost"
        status="basic"
        onPress={onSignUpButtonPress}>
        Don't have an account? Create
      </Button>
    </View>
  );
};

export default SignIn;
