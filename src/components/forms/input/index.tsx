import React, {FC} from 'react';
import {View} from 'react-native';
import {Input as KittenInput, Text} from '@ui-kitten/components';
import {Controller} from 'react-hook-form';

import {useInput} from './input.hooks';
import {inputStyles} from './input.styles';
import {InputProps} from './input.types';
import Delayed from 'hooks/delayed';

export const Input: FC<InputProps> = ({name, ...props}) => {
  const {control, fieldError, errorMessage} = useInput(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <View>
          <KittenInput
            {...props}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            status={fieldError ? 'danger' : 'basic'}
          />

          {errorMessage && (
            <Delayed waitBeforeShow={5}>
              <Text
                testID={`${name}-input-message`}
                style={inputStyles.errorMessage}
                status="danger">
                {errorMessage}
              </Text>
            </Delayed>
          )}
        </View>
      )}
    />
  );
};
