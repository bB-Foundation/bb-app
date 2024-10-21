import React from 'react';
import {
  render,
  fireEvent,
  act,
  waitFor,
  renderHook,
} from '@testing-library/react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import SignIn from '.';
import * as hooks from './sign-in.hooks';
import {SignInFormFields} from './sign-in.types';
import {signInFormSchema} from './sign-in.api';
import {Providers, testUserCredentials} from '../../configs/tests';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  reset: jest.fn(),
}));

jest.spyOn(hooks, 'useCheckAuth').mockReturnValue();

const useButtonHandlersMock = {
  onSignUpButtonPress: jest.fn(),
  onForgotPasswordButtonPress: jest.fn(),
};

describe('SignIn component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call submitHandler on submit button press', async () => {
    const {result} = renderHook(() =>
      useForm({
        resolver: yupResolver<SignInFormFields>(signInFormSchema),
      }),
    );
    const formData = result.current;

    const spy = jest.spyOn(hooks, 'useFormLogic');
    const submitHandler = jest.fn();
    spy.mockReturnValue({
      formData,
      isSubmitting: false,
      submitHandler,
    });

    const {getByTestId, getByPlaceholderText} = render(
      <Providers>
        <SignIn />
      </Providers>,
    );

    fireEvent.changeText(
      getByPlaceholderText('Email'),
      testUserCredentials.email,
    );
    fireEvent.changeText(
      getByPlaceholderText('Password'),
      testUserCredentials.password,
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit-button'));
    });

    await waitFor(() => {
      expect(submitHandler).toHaveBeenCalled();
    });
  });

  it('should show email error message if email is invalid', async () => {
    const {getByTestId, queryByTestId} = render(
      <Providers>
        <SignIn />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit-button'));
    });

    expect(queryByTestId('email-input-message')).toBeTruthy();
  });

  it('should show password error message if password is invalid', async () => {
    const {getByTestId, queryByTestId} = render(
      <Providers>
        <SignIn />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit-button'));
    });

    expect(queryByTestId('password-input-message')).toBeTruthy();
  });

  it('should call togglePasswordVisibility on password visibility button press', async () => {
    const spy = jest.spyOn(hooks, 'useIsPasswordVisible');
    const togglePasswordVisibility = jest.fn();
    spy.mockReturnValue({
      isPasswordVisible: false,
      togglePasswordVisibility,
    });

    const {getByTestId} = render(
      <Providers>
        <SignIn />
      </Providers>,
    );

    jest.useFakeTimers();

    await act(async () => {
      fireEvent.press(getByTestId('toggle-password-visibility-button'));
    });

    jest.runAllTimers();

    await waitFor(() => {
      expect(togglePasswordVisibility).toHaveBeenCalled();
    });
  });

  it('should call onForgotPasswordButtonPress on forgot password button press', async () => {
    const spy = jest.spyOn(hooks, 'useButtonHandlers');
    const onForgotPasswordButtonPress = jest.fn();
    spy.mockReturnValue({
      ...useButtonHandlersMock,
      onForgotPasswordButtonPress,
    });

    const {getByTestId} = render(
      <Providers>
        <SignIn />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('forgot-password-button'));
    });

    await waitFor(() => {
      expect(onForgotPasswordButtonPress).toHaveBeenCalled();
    });
  });

  it('should call onSignUpButtonPress on sign up button press', async () => {
    const spy = jest.spyOn(hooks, 'useButtonHandlers');
    const onSignUpButtonPress = jest.fn();
    spy.mockReturnValue({
      ...useButtonHandlersMock,
      onSignUpButtonPress,
    });

    const {getByTestId} = render(
      <Providers>
        <SignIn />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('sign-up-button'));
    });

    await waitFor(() => {
      expect(onSignUpButtonPress).toHaveBeenCalled();
    });
  });
});
