import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {
  CodeField as RNCodeField,
  Cursor,
} from 'react-native-confirmation-code-field';

import styles from './code-field.styles';
import {CodeFieldProps} from './code-field.types';
import {cellCount} from './code-field.api';
import {useCodeField} from './code-field.hooks';

const CodeField: FC<CodeFieldProps> = ({value, setValue}) => {
  const {ref, props, getCellOnLayoutHandler} = useCodeField({
    value,
    setValue,
  });

  return (
    <View>
      <RNCodeField
        {...props}
        ref={ref}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CodeField;
