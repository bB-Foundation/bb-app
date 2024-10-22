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

import SignUp from '.';
import * as hooks from './sign-up.hooks';
import {Providers, testUserCredentials} from '../../configs/tests';
import {SignUpFormFields} from './sign-up.types';
import {signUpFormSchema} from './sign-up.api';

describe('SignUp component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call submitHandler on submit button press', async () => {
    const {result} = renderHook(() =>
      useForm({
        resolver: yupResolver<SignUpFormFields>(signUpFormSchema),
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
        <SignUp />
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
        <SignUp />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit-button'));
    });

    await waitFor(() =>
      expect(queryByTestId('email-input-message')).toBeTruthy(),
    );
  });

  it('should show password error message if password is invalid', async () => {
    const {getByTestId, queryByTestId} = render(
      <Providers>
        <SignUp />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit-button'));
    });

    await waitFor(() =>
      expect(queryByTestId('password-input-message')).toBeTruthy(),
    );
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
        <SignUp />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('toggle-password-visibility-button'));
    });

    await waitFor(() => {
      expect(togglePasswordVisibility).toHaveBeenCalled();
    });
  });

  it('should call onSignInButtonPress on sign in button press', async () => {
    const spy = jest.spyOn(hooks, 'useButtonHandlers');
    const onSignInButtonPress = jest.fn();
    spy.mockReturnValue({onSignInButtonPress});

    const {getByTestId} = render(
      <Providers>
        <SignUp />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('sign-in-button'));
    });

    await waitFor(() => {
      expect(onSignInButtonPress).toHaveBeenCalled();
    });
  });
});
