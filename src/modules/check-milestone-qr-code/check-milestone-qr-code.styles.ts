import {StyleService} from '@ui-kitten/components';

export default StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 32,
  },
  imageContainer: {
    height: 330,
    paddingTop: 32,
  },
  statusContainer: {alignItems: 'center', gap: 32},
  processingText: {textAlign: 'center', fontWeight: 'normal'},
});
