import React, {FC} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Layout, useStyleSheet, Text} from '@ui-kitten/components';

import SuccessIcon from '../../assets/images/new-account-congrats/success.svg';
import rootStyles from './new-account-congrats.styles';
import {useButtonHandlers} from './new-account-congrats.hooks';

const NewAccountCongrats: FC = () => {
  const {goToMain} = useButtonHandlers();

  const styles = useStyleSheet(rootStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconWrapper}>
        <SuccessIcon width="100%" height="100%" />
      </View>

      <Layout style={styles.formContainer} level="1">
        <Text category="h3" style={styles.congratsHeader}>
          Welcome
        </Text>
        <Text category="h4" style={styles.congratsLabel}>
          Your account has been successfully registered
        </Text>
      </Layout>

      <Button style={styles.submitButton} size="giant" onPress={goToMain}>
        NEXT
      </Button>
    </SafeAreaView>
  );
};

export default NewAccountCongrats;
