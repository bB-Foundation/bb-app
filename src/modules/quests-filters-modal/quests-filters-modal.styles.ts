import {StyleService} from '@ui-kitten/components';

export default StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
    gap: 32,
    flex: 1,
  },
  content: {
    gap: 32,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
  },
  rangeField: {
    paddingHorizontal: 16,
  },
  bottomContainer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
