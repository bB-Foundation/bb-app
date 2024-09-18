import {StyleService} from '@ui-kitten/components';

export const restorePasswordStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
    flex: 1,
    gap: 28,
    justifyContent: 'space-between',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
  },
  formContainer: {
    flex: 1,
    paddingTop: 14,
    paddingHorizontal: 16,
    gap: 30,
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
  hintLabel: {
    fontWeight: 'normal',
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
