import {StyleService} from '@ui-kitten/components';

export const imageStyles = StyleService.create({
  root: {width: 80, height: 80, marginTop: 8},
});

export default StyleService.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerActive: {
    borderColor: 'color-primary-500',
  },
  gemTitleText: {textAlign: 'center', fontWeight: 'bold'},
  gemAmountText: {marginTop: 8, textAlign: 'center'},
});
