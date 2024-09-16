import React, {FC} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Layout, useStyleSheet, Text} from '@ui-kitten/components';

import SuccessIcon from '../../assets/images/success.svg';
import rootStyles from './restore-password-congrats.styles';
import {useButtonHandlers} from './restore-password-congrats.hooks';

const RestorePasswordCongrats: FC = () => {
  const {goToSingIn} = useButtonHandlers();

  const styles = useStyleSheet(rootStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconWrapper}>
        <SuccessIcon width="100%" height="100%" />
      </View>

      <Layout style={styles.formContainer} level="1">
        <Text category="h3" style={styles.congratsHeader}>
          Success
        </Text>
        <Text category="h4" style={styles.congratsLabel}>
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
