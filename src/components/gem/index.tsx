import React, {FC} from 'react';
import {Card, Text, useStyleSheet} from '@ui-kitten/components';
import FastImage from '@d11/react-native-fast-image';
import {upperFirst} from 'lodash';

import themedStyles, {imageStyles} from './gem.styles';
import {GemColor} from 'types/gem';

export type GemProps = {
  color: GemColor;
  amount: number;
  imageUrl: string;
  isSelected: boolean;
  onPress?: () => void;
};

export const Gem: FC<GemProps> = ({
  color,
  amount,
  imageUrl,
  isSelected,
  onPress,
}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Card
      style={[styles.container, isSelected && styles.containerActive]}
      onPress={onPress}>
      <Text style={styles.gemTitleText}>{upperFirst(color)}</Text>

      <FastImage
        resizeMode="contain"
        style={imageStyles.root}
        source={{uri: imageUrl}}
      />

      <Text style={styles.gemAmountText}>Amount: {amount}</Text>
    </Card>
  );
};
