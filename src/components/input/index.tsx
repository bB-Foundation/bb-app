import React, {FC} from 'react';
import {View} from 'react-native';
import {Input as KittenInput, Text} from '@ui-kitten/components';
import {Controller} from 'react-hook-form';

import {useInput} from './input.hooks';
import {inputStyles} from './input.styles';
import {InputProps} from './input.types';

export const Input: FC<InputProps> = ({name, ...props}) => {
  const {control, fieldError, errorMessage} = useInput(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <View>
          <KittenInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            status={fieldError ? 'danger' : 'basic'}
            {...props}
          />

          {errorMessage && (
            <Text
              style={inputStyles.errorMessage}
              status={fieldError ? 'danger' : 'basic'}>
              {errorMessage}
            </Text>
          )}
        </View>
      )}
    />
  );
};
