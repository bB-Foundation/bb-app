import React, {FC} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button, Layout, useStyleSheet, Text, Icon} from '@ui-kitten/components';
import {FormProvider} from 'react-hook-form';

import {ForgotPasswordStyles} from './forgot-password.styles';
import {useButtonHandlers, useFormLogic} from './forgot-password.hooks';
import {Input} from '../../components/input';

const ForgotPassword: FC = () => {
  const {formData, submitHandler} = useFormLogic();

  const styles = useStyleSheet(ForgotPasswordStyles);

  const {goBack} = useButtonHandlers();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <Text category="h1" status="control">
              bB
            </Text>
            <Text style={styles.headerLabel} category="s1" status="control">
              Forgot Password
            </Text>
          </View>

          <FormProvider {...formData}>
            <Layout style={styles.formContainer} level="1">
              <Text style={styles.emailLabel}>
                Please enter your email address
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
            onPress={submitHandler}>
            SEND VERIFICATION CODE
          </Button>

          <Button
            style={styles.goBackButton}
            appearance="ghost"
            status="basic"
            onPress={goBack}>
            Go back
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
