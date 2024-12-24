import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';

import styles from './select-tokens.styles';
import {Gem} from '../../../../components/gem';
import {useLayout, useSelectTokens} from './select-tokens.hooks';
import {GemColor} from 'types/gem';
import {OverlayLoader} from 'components/overlay-loader';
import {SelectTokensProps} from './select-tokens.types';

export const SelectTokens: FC<SelectTokensProps> = ({
  userId,
  submitHandler,
  submitValidator,
}) => {
  const {
    stackedGems,
    selectedGemColor,
    isLoading,
    selectGemColor,
    onSubmitButtonPress,
  } = useSelectTokens({userId, submitHandler, submitValidator});

  const {mainContainerMarginTop} = useLayout();

  return (
    <>
      {isLoading && <OverlayLoader />}

      <View style={[styles.container, {marginTop: mainContainerMarginTop}]}>
        <Text category="h6">Select gems</Text>

        <View style={styles.gemsContainer}>
          {Object.keys(stackedGems).map(k => (
            <Gem
              key={k}
              color={k as GemColor}
              amount={stackedGems[k].length}
              imageUrl={stackedGems[k][0]?.imageUrl}
              onPress={() => selectGemColor(k as GemColor)}
              isSelected={selectedGemColor === (k as GemColor)}
            />
          ))}
        </View>

        <View style={styles.buttonView}>
          <Button
            onPress={onSubmitButtonPress}
            disabled={!selectedGemColor}
            style={styles.submitButton}>
            NEXT
          </Button>
        </View>
      </View>
    </>
  );
};
