import React, {FC} from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

const Main: FC = () => {
  return (
    <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text category="h4">Main page</Text>
    </View>
  );
};

export default Main;
