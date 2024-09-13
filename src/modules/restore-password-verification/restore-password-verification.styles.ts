import {StyleService} from '@ui-kitten/components';

export default StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
    flexGrow: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
  },
  headerLabel: {
    marginTop: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    gap: 30,
  },
  emailLabel: {
    textAlign: 'center',
  },
  emailInput: {
    marginTop: 16,
  },
  submitButton: {
    marginHorizontal: 16,
  },
  goBackButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
