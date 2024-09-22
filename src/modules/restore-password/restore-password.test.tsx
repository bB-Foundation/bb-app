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

import RestorePassword from '.';
import {Providers, testUserCredentials} from '../../configs/tests';
import * as hooks from './restore-password.hooks';
import {RestorePasswordFormFields} from './restore-password.types';
import {restorePasswordFormSchema} from './restore-password.api';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
}));

describe('RestorePassword component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call submitHandler on submit button press', async () => {
    const {result} = renderHook(() =>
      useForm({
        resolver: yupResolver<RestorePasswordFormFields>(
          restorePasswordFormSchema,
        ),
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
        <RestorePassword />
      </Providers>,
    );

    fireEvent.changeText(
      getByPlaceholderText('New Password'),
      testUserCredentials.password,
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit-button'));
    });

    await waitFor(() => {
      expect(submitHandler).toHaveBeenCalled();
    });
  });

  it('should show password error message if password is invalid', async () => {
    const {getByTestId, queryByTestId} = render(
      <Providers>
        <RestorePassword />
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
        <RestorePassword />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('toggle-password-visibility-button'));
    });

    await waitFor(() => {
      expect(togglePasswordVisibility).toHaveBeenCalled();
    });
  });

  it('should call exitToSignIn on exit button press', async () => {
    const spy = jest.spyOn(hooks, 'useButtonHandlers');
    const exitToSignIn = jest.fn();
    spy.mockReturnValue({exitToSignIn});

    const {getByTestId} = render(
      <Providers>
        <RestorePassword />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('exit-button'));
    });

    await waitFor(() => expect(exitToSignIn).toHaveBeenCalled());
  });
});
