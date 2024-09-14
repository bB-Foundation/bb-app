import React, {FC} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Layout, useStyleSheet, Text} from '@ui-kitten/components';

import rootStyles from './new-account-congrats.styles';
import {useButtonHandlers} from './new-account-congrats.hooks';

const NewAccountCongrats: FC = () => {
  const {goToMain} = useButtonHandlers();

  const styles = useStyleSheet(rootStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          bB
        </Text>
        <Text style={styles.headerLabel} category="s1" status="control">
          Congratulations! 🎉
        </Text>
      </View>

      <Layout style={styles.formContainer} level="1">
        <Text category="h3" style={styles.congratsLabel}>
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
