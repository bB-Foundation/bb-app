import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Layout, useStyleSheet, Text, Icon} from '@ui-kitten/components';
import {FormProvider} from 'react-hook-form';

import {SignUpStyles} from './sign-up.styles';
import {
  useButtonHandlers,
  useFormLogic,
  useIsPasswordVisible,
} from './ sign-up.hooks';
import {Input} from '../../components/forms/input';
import WelcomeIcon from '../../assets/images/sign-up/people.svg';
import Page from '../../components/page';

const SignUp: FC = () => {
  const {formData, isSubmitting, submitHandler} = useFormLogic();

  const {isPasswordVisible, togglePasswordVisibility} = useIsPasswordVisible();

  const styles = useStyleSheet(SignUpStyles);

  const {onSignInButtonPress} = useButtonHandlers();

  return (
    <Page>
      <View style={styles.container}>
        <View>
          <View style={styles.iconWrapper}>
            <WelcomeIcon width="92%" height="100%" />
          </View>

          <Text style={styles.signUpLabel} category="h2" status="control">
            Sign up
          </Text>

          <FormProvider {...formData}>
            <Layout style={styles.formContainer} level="1">
              <Input
                name="email"
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
            </Layout>
          </FormProvider>
        </View>

        <View>
          <Button
            style={styles.signUpButton}
            size="giant"
            onPress={submitHandler}
            disabled={isSubmitting}>
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
      </View>
    </Page>
  );
};

export default SignUp;
