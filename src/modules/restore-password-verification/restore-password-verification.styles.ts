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
    color: 'black',
    paddingHorizontal: 16,
    fontWeight: '600',
  },
  iconWrapper: {
    height: 330,
    paddingTop: 32,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    gap: 30,
  },
  emailLabel: {
    fontWeight: 'normal',
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
