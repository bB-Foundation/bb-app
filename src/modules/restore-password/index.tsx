import React, {FC} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Layout, Text, useStyleSheet, Icon} from '@ui-kitten/components';
import {FormProvider} from 'react-hook-form';

import {Input} from '../../components/input';
import {signInStyles} from './restore-password.styles';
import {
  useButtonHandlers,
  useFormLogic,
  useIsPasswordVisible,
} from './restore-password.hooks';

const RestorePassword: FC = () => {
  const {formData, isSubmitting, submitHandler} = useFormLogic();

  const {isPasswordVisible, togglePasswordVisibility} = useIsPasswordVisible();

  const styles = useStyleSheet(signInStyles);

  const {exitToSignIn} = useButtonHandlers();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          bB
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          Restore Password
        </Text>
      </View>

      <FormProvider {...formData}>
        <Layout style={styles.formContainer} level="1">
          <Input
            name="password"
            style={styles.passwordInput}
            placeholder="New Password"
            accessoryRight={
              <Icon
                onPress={togglePasswordVisibility}
                name={isPasswordVisible ? 'eye-off' : 'eye'}
              />
            }
            secureTextEntry={!isPasswordVisible}
          />
        </Layout>
      </FormProvider>

      <Button
        style={styles.signInButton}
        size="giant"
        onPress={submitHandler}
        disabled={isSubmitting}>
        RESTORE PASSWORD
      </Button>

      <Button
        style={styles.signUpButton}
        appearance="ghost"
        status="basic"
        onPress={exitToSignIn}>
        Exit
      </Button>
    </SafeAreaView>
  );
};

export default RestorePassword;
