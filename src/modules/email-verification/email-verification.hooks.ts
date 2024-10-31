import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import {
  getDeployAccountAdditionalData,
  isErrorMessage,
  resendEmailVerification,
  verifyEmail,
  WebAppEvents,
} from './email-verification.api';
import {
  NavigationProp,
  RootStackParamList,
} from '../navigation/navigation.types';
import {getApiOrUnknownErrorMessage} from 'src/shared/utils/errors';
import {DeployAccountData, Web3AccountData} from './email-verification.types';
import {useWebViewMessage} from 'react-native-react-bridge';
import {RootState} from 'src/redux-store';
import {
  resetState,
  setIsSubmitting,
  setResendEmailUsed,
  verifyEmail as verifyEmailAction,
} from 'src/redux-store/slices/email-verification-page';
import {Errors} from 'src/enums/errors';
import {
  clearUserPassword,
  storeUserPrivateKey,
} from 'src/shared/utils/secure-storage';

export const useFormLogic = () => {
  const dispatch = useDispatch();

  const {mutateAsync: verifyEmailAsync} = useVerifyEmail();

  const {verificationCode, isResendEmailUsed, isSubmitting} = useSelector(
    (state: RootState) => state.emailVerificationPage,
  );

  const onSubmit = async () => {
    try {
      dispatch(setIsSubmitting(true));
      await verifyEmailAsync(verificationCode);
      dispatch(verifyEmailAction(true));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getApiOrUnknownErrorMessage(error),
      });
      dispatch(setIsSubmitting(false));
    }
  };

  return {
    isResendEmailUsed,
    isSubmitting,
    onSubmit,
  };
};

export const useButtonHandlers = () => {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<RouteProp<RootStackParamList, 'email-verification'>>();

  const {isSubmitting} = useSelector(
    (state: RootState) => state.emailVerificationPage,
  );

  const dispatch = useDispatch();

  const {mutateAsync: resendEmailVerificationAsync} =
    useResendEmailVerification();

  const resendEmailVerificationHandler = async () => {
    if (isSubmitting) return;

    try {
      await resendEmailVerificationAsync(route.params.email);
      dispatch(setResendEmailUsed(true));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getApiOrUnknownErrorMessage(error),
      });
    }
  };

  const exitToSignIn = (): void =>
    Alert.alert('Exit', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          navigation.reset({index: 0, routes: [{name: 'sign-in'}]}),
      },
    ]);

  const onResendEmailTimerEnd = () => {
    dispatch(setResendEmailUsed(false));
  };

  return {exitToSignIn, resendEmailVerificationHandler, onResendEmailTimerEnd};
};

const useVerifyEmail = () => useMutation({mutationFn: verifyEmail});

const useResendEmailVerification = () =>
  useMutation({mutationFn: resendEmailVerification});

export const useCreateWallet = () => {
  const {isEmailVerified} = useSelector(
    (state: RootState) => state.emailVerificationPage,
  );

  const [web3AccountData, setWeb3AccountData] = useState<Web3AccountData>();

  const navigation = useNavigation<NavigationProp>();

  const dispatch = useDispatch();

  const stopSubmitting = useCallback(() => {
    dispatch(setIsSubmitting(false));
    dispatch(verifyEmailAction(false));
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: Errors.UNKNOWN,
    });
  }, [dispatch]);

  const {
    ref: webBrowserRef,
    onMessage: onWebBrowserMessage,
    emit: emitToWebBrowser,
  } = useWebViewMessage(async message => {
    switch (message.type) {
      case WebAppEvents.CREATE_ACCOUNT_RESULT: {
        if (isErrorMessage(message.data)) {
          stopSubmitting();
          return;
        }

        setWeb3AccountData(message.data as Web3AccountData);
        break;
      }
      case WebAppEvents.DEPLOY_ACCOUNT_RESULT: {
        if (isErrorMessage(message.data)) {
          stopSubmitting();
          return;
        }

        await clearUserPassword();

        navigation.reset({index: 0, routes: [{name: 'new-account-congrats'}]});
        break;
      }
    }
  });

  /** start creating wallet after email verification */
  useEffect(() => {
    if (!isEmailVerified) return;

    emitToWebBrowser({
      type: WebAppEvents.CREATE_ACCOUNT,
      data: undefined,
    });
  }, [isEmailVerified, emitToWebBrowser]);

  /** deploy account after getting private key */
  useEffect(() => {
    (async () => {
      try {
        if (!web3AccountData) return;

        await storeUserPrivateKey(web3AccountData.privateKey);

        const additionalData = await getDeployAccountAdditionalData(
          web3AccountData.privateKey,
        );

        const data: DeployAccountData = {
          ...web3AccountData,
          ...additionalData,
        };

        emitToWebBrowser({
          type: WebAppEvents.DEPLOY_ACCOUNT,
          data,
        });
      } catch (error) {
        stopSubmitting();
      }
    })();
  }, [web3AccountData, emitToWebBrowser, stopSubmitting]);

  return {
    webBrowserRef,
    onWebBrowserMessage,
  };
};

/** clear state on screen blur */
export const useResetEmailVerificationState = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resetState());
      };
    }, [dispatch]),
  );
};
