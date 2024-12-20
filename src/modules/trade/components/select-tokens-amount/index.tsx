import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Input, Text} from '@ui-kitten/components';
import FastImage from '@d11/react-native-fast-image';

import {OverlayLoader} from 'components/overlay-loader';
import {useSelectAmount} from './select-tokens-amount.hooks';
import styles, {imageStyles} from './select-tokens-amount.styles';
import {SelectTokensAmountProps} from './select-tokens-amount.types';

export const SelectTokensAmount: FC<SelectTokensAmountProps> = ({
  userId,
  gemColor,
  submitHandler,
  submitValidator,
}) => {
  const {
    isLoading,
    gemsOfSelectedColor,
    gemsAmountStr,
    setGemsAmountStr,
    onSubmitButtonPress,
  } = useSelectAmount({userId, gemColor, submitHandler, submitValidator});

  return (
    <>
      {isLoading && <OverlayLoader />}

      {!!gemsOfSelectedColor.length && (
        <View style={styles.container}>
          <Text category="h6">Select gems amount</Text>

          <View style={styles.imageWrapper}>
            <FastImage
              resizeMode="contain"
              style={imageStyles.root}
              source={{uri: gemsOfSelectedColor[0].imageUrl}}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text>Available gems amount: {gemsOfSelectedColor.length}</Text>

            <Input
              value={gemsAmountStr}
              onChange={e => setGemsAmountStr(e.nativeEvent.text)}
              keyboardType="numeric"
            />
          </View>

          <Button
            onPress={onSubmitButtonPress}
            disabled={!gemsAmountStr}
            style={styles.submitButton}>
            NEXT
          </Button>
        </View>
      )}
    </>
  );
};
