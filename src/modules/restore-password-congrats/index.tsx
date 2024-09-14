import React, {FC} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Layout, useStyleSheet, Text} from '@ui-kitten/components';

import rootStyles from './restore-password-congrats.styles';
import {useButtonHandlers} from './restore-password-congrats.hooks';

const RestorePasswordCongrats: FC = () => {
  const {goToSingIn} = useButtonHandlers();

  const styles = useStyleSheet(rootStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          bB
        </Text>
        <Text style={styles.headerLabel} category="s1" status="control">
          Restore Password
        </Text>
      </View>

      <Layout style={styles.formContainer} level="1">
        <Text category="h3" style={styles.congratsLabel}>
          Password has been successfully reset
        </Text>
      </Layout>

      <Button style={styles.submitButton} size="giant" onPress={goToSingIn}>
        SIGN IN
      </Button>
    </SafeAreaView>
  );
};

export default RestorePasswordCongrats;
