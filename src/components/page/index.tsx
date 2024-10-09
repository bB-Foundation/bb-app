import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyleSheet} from '@ui-kitten/components';

import rootStyles from './page.styles';
import ContentWrapper from './components/content-wrapper';
import {PageProps} from './page.types';

const Page: FC<PageProps> = ({children, isBottomTabContainer}) => {
  const styles = useStyleSheet(rootStyles);

  return (
    <SafeAreaView
      edges={isBottomTabContainer ? ['top'] : undefined}
      style={styles.container}>
      <ContentWrapper>{children}</ContentWrapper>
    </SafeAreaView>
  );
};

export default Page;
