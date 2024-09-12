import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Layout, useStyleSheet, Text, Icon} from '@ui-kitten/components';
import {FormProvider} from 'react-hook-form';

import {SignUpStyles} from './sign-up.styles';
import {
  useButtonHandlers,
  useFormLogic,
  useIsPasswordVisible,
} from './ sign-up.hooks';
import {Input} from '../../components/input';
import {CheckBox} from '../../components/checkbox';

const SignUp: FC = () => {
  const {formData, submitHandler} = useFormLogic();

  const {isPasswordVisible, togglePasswordVisibility} = useIsPasswordVisible();

  const styles = useStyleSheet(SignUpStyles);

  const {onSignInButtonPress} = useButtonHandlers();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Welcome
          </Text>
          <Text style={styles.signUpLabel} category="s1" status="control">
            Create a new account
          </Text>
        </View>

        <FormProvider {...formData}>
          <Layout style={styles.formContainer} level="1">
            <Input
              name="userName"
              placeholder="User Name"
              accessoryRight={<Icon name="person" />}
            />

            <Input
              name="email"
              style={styles.emailInput}
              autoCapitalize="none"
              placeholder="Email"
              accessoryRight={<Icon name="email" />}
            />

            <Input
              name="password"
              style={styles.passwordInput}
              secureTextEntry={!isPasswordVisible}
              placeholder="Password"
              accessoryRight={
                <Icon
                  onPress={togglePasswordVisibility}
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                />
              }
            />

            <Input
              name="passwordRepeat"
              style={styles.passwordInput}
              secureTextEntry={!isPasswordVisible}
              placeholder="Repeat Password"
              accessoryRight={<Icon name="lock-outline" />}
            />

            <CheckBox name="termsAccepted" style={styles.termsCheckBox}>
              {props => (
                <Text {...props} style={styles.termsCheckBoxText}>
                  I read and agree to Terms & Conditions
                </Text>
              )}
            </CheckBox>
          </Layout>
        </FormProvider>
      </View>

      <View>
        <Button
          style={styles.signUpButton}
          size="giant"
          onPress={submitHandler}>
          SIGN UP
        </Button>

        <Button
          style={styles.signInButton}
          appearance="ghost"
          status="basic"
          onPress={onSignInButtonPress}>
          Already have an account? Sign In
        </Button>
      </View>
    </ScrollView>
  );
};

export default SignUp;
