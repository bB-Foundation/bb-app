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

import ForgotPassword from '.';
import {Providers, testUserCredentials} from '../../configs/tests';
import {ForgotPasswordFormFields} from './forgot-password.types';
import {forgotPasswordFormSchema} from './forgot-password.api';
import * as hooks from './forgot-password.hooks';

describe('ForgotPassword component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call submitHandler on submit button press', async () => {
    const {result} = renderHook(() =>
      useForm({
        resolver: yupResolver<ForgotPasswordFormFields>(
          forgotPasswordFormSchema,
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
        <ForgotPassword />
      </Providers>,
    );

    fireEvent.changeText(
      getByPlaceholderText('Email'),
      testUserCredentials.email,
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
        <ForgotPassword />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit-button'));
    });

    await waitFor(() =>
      expect(queryByTestId('email-input-message')).toBeTruthy(),
    );
  });

  it('should call goBack on back button press', async () => {
    const spy = jest.spyOn(hooks, 'useButtonHandlers');
    const goBack = jest.fn();
    spy.mockReturnValue({goBack});

    const {getByTestId} = render(
      <Providers>
        <ForgotPassword />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('go-back-button'));
    });

    await waitFor(() => expect(goBack).toHaveBeenCalled());
  });
});
