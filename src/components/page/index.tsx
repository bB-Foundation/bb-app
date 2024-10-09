import React, {FC} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyleSheet} from '@ui-kitten/components';

import rootStyles from './page.styles';
import ContentWrapper from './components/content-wrapper';
import {PageProps} from './page.types';

const Page: FC<PageProps> = ({children, isSafeContainer}) => {
  const styles = useStyleSheet(rootStyles);

  if (isSafeContainer === true || isSafeContainer === undefined) {
    return (
      <SafeAreaView style={styles.container}>
        <ContentWrapper>{children}</ContentWrapper>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <ContentWrapper>{children}</ContentWrapper>
    </View>
  );
};

export default Page;
