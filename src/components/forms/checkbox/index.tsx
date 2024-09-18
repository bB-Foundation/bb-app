import React, {FC} from 'react';
import {View} from 'react-native';
import {CheckBox as KittenCheckBox, Text} from '@ui-kitten/components';
import {Controller} from 'react-hook-form';

import {useCheckBox} from './checkbox.hooks';
import {checkBoxStyles} from './checkbox.styles';
import {CheckBoxProps} from './checkbox.types';

export const CheckBox: FC<CheckBoxProps> = ({name, children, ...props}) => {
  const {control, errorMessage} = useCheckBox(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <View>
          <KittenCheckBox checked={value} onChange={onChange} {...props}>
            {children}
          </KittenCheckBox>

          {errorMessage && (
            <Text style={checkBoxStyles.errorMessage} status="danger">
              {errorMessage}
            </Text>
          )}
        </View>
      )}
    />
  );
};
