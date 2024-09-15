import {StyleService} from '@ui-kitten/components';

export default StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
    flexGrow: 1,
  },
  iconWrapper: {
    height: 330,
    paddingTop: 32,
  },
  formContainer: {
    flex: 1,
    paddingTop: 44,
    paddingHorizontal: 16,
    gap: 30,
  },
  congratsHeader: {
    textAlign: 'center',
    fontWeight: '600',
  },
  congratsLabel: {
    textAlign: 'center',
    fontWeight: 'normal',
  },
  submitButton: {
    marginHorizontal: 16,
    marginVertical: 23,
  },
});
