// import React from 'react';
// import {render, fireEvent, act, waitFor} from '@testing-library/react-native';
// import Toast from 'react-native-toast-message';

// import EmailVerification from '.';
// import {Providers, setupTestStore} from '../../configs/tests';
// import * as hooks from './email-verification.hooks';

// jest.mock('@react-navigation/native', () => ({
//   ...jest.requireActual('@react-navigation/native'),
//   useRoute: jest.fn(),
// }));

// jest.mock('react-native-react-bridge/lib/web', () => ({
//   webViewRender: jest.fn(),
// }));

// jest.mock('react-native-webview', () => 'WebView');

// describe('EmailVerification component', () => {
//   const storeRef = setupTestStore();

//   afterEach(() => {
//     jest.clearAllMocks();
//     jest.restoreAllMocks();
//   });

//   it('should call submitHandler with valid verification code on submit button press', async () => {
//     const spy = jest.spyOn(hooks, 'useFormLogic');
//     const onSubmit = jest.fn();
//     spy.mockReturnValue({onSubmit});

//     const {getByTestId} = render(
//       <Providers>
//         <EmailVerification />
//       </Providers>,
//       {wrapper: storeRef.wrapper},
//     );

//     const codeFiled = getByTestId('code-field');

//     fireEvent.changeText(codeFiled, '123456');

//     jest.useFakeTimers();

//     await act(async () => fireEvent.press(getByTestId('submit-button')));

//     jest.runAllTimers();

//     await waitFor(() => expect(onSubmit).toHaveBeenCalled());
//   });

//   it('should show error toast on submit error response', async () => {
//     const testSpy = jest.spyOn(Toast, 'show');

//     const {getByTestId} = render(
//       <Providers>
//         <EmailVerification />
//       </Providers>,
//       {wrapper: storeRef.wrapper},
//     );

//     const codeFiled = getByTestId('code-field');

//     fireEvent.changeText(codeFiled, '123456');

//     await act(async () => fireEvent.press(getByTestId('submit-button')));

//     await waitFor(() =>
//       expect(testSpy).toHaveBeenCalledWith({
//         type: 'error',
//         text1: expect.any(String),
//         text2: expect.any(String),
//       }),
//     );
//   });

//   it('should not call submitHandler because verification code is invalid', async () => {
//     const spy = jest.spyOn(hooks, 'useFormLogic');
//     const onSubmit = jest.fn();
//     spy.mockReturnValue({onSubmit: onSubmit});

//     const {getByTestId} = render(
//       <Providers>
//         <EmailVerification />
//       </Providers>,
//       {wrapper: storeRef.wrapper},
//     );

//     const codeFiled = getByTestId('code-field');

//     fireEvent.changeText(codeFiled, '123');

//     await act(async () => {
//       fireEvent.press(getByTestId('submit-button'));
//     });

//     await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
//   });

//   it('should call resendEmailVerification on resend button press', async () => {
//     const spy = jest.spyOn(hooks, 'useButtonHandlers');
//     const resendEmailVerificationHandler = jest.fn();
//     spy.mockReturnValue({
//       exitToSignIn: jest.fn(),
//       resendEmailVerificationHandler,
//     });

//     const {getByTestId} = render(
//       <Providers>
//         <EmailVerification />
//       </Providers>,
//       {wrapper: storeRef.wrapper},
//     );

//     await act(async () => {
//       fireEvent.press(getByTestId('resend-verification-code-button'));
//     });

//     await waitFor(() =>
//       expect(resendEmailVerificationHandler).toHaveBeenCalled(),
//     );
//   });

//   it('should call exitToSignIn on exit button press', async () => {
//     const spy = jest.spyOn(hooks, 'useButtonHandlers');
//     const exitToSignIn = jest.fn();
//     spy.mockReturnValue({
//       exitToSignIn,
//       resendEmailVerificationHandler: jest.fn(),
//     });

//     const {getByTestId} = render(
//       <Providers>
//         <EmailVerification />
//       </Providers>,
//       {wrapper: storeRef.wrapper},
//     );

//     await act(async () => {
//       fireEvent.press(getByTestId('exit-button'));
//     });

//     await waitFor(() => expect(exitToSignIn).toHaveBeenCalled());
//   });
// });
