import {Dimensions, StyleSheet} from 'react-native';

const screenDimensions = Dimensions.get('screen');

export default StyleSheet.create({
  root: {minHeight: 300},
  codeFiledRoot: {
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 10,
  },
  cellRoot: {
    width: screenDimensions.width / 6 - 10 * 1.5,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
});
