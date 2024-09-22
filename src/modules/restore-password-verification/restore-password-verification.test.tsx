import React from 'react';
import {render, fireEvent, act, waitFor} from '@testing-library/react-native';

import RestorePasswordVerification from '.';
import {Providers} from '../../configs/tests';
import * as hooks from './restore-password-verification.hooks';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
}));

const useFormLogicMock = {
  verificationCode: '',
  isValidVerificationCode: false,
  isSubmitting: false,
  setVerificationCode: jest.fn(),
  onSubmit: jest.fn(),
  resendEmailVerification: jest.fn(),
};

describe('RestorePasswordVerification component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call submitHandler on submit button press', async () => {
    const spy = jest.spyOn(hooks, 'useFormLogic');
    const submitHandlerMock = jest.fn();
    spy.mockReturnValue({
      ...useFormLogicMock,
      isValidVerificationCode: true,
      onSubmit: submitHandlerMock,
    });

    const {getByTestId} = render(
      <Providers>
        <RestorePasswordVerification />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit-button'));
    });

    await waitFor(() => expect(submitHandlerMock).toHaveBeenCalled());
  });

  it('should not call submitHandler because verification code is invalid', async () => {
    const spy = jest.spyOn(hooks, 'useFormLogic');
    const submitHandlerMock = jest.fn();
    spy.mockReturnValue({...useFormLogicMock, onSubmit: submitHandlerMock});

    const {getByTestId} = render(
      <Providers>
        <RestorePasswordVerification />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit-button'));
    });

    await waitFor(() => expect(submitHandlerMock).not.toHaveBeenCalled());
  });

  it('should call exitToSignIn on exit button press', async () => {
    const spy = jest.spyOn(hooks, 'useButtonHandlers');
    const exitToSignIn = jest.fn();
    spy.mockReturnValue({exitToSignIn});

    const {getByTestId} = render(
      <Providers>
        <RestorePasswordVerification />
      </Providers>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('exit-button'));
    });

    await waitFor(() => expect(exitToSignIn).toHaveBeenCalled());
  });
});
