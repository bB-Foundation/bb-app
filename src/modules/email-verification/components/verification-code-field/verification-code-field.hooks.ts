import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux-store';

import {setVerificationCode} from 'src/redux-store/slices/email-verification-page';

export const useFieldLogic = () => {
  const dispatch = useDispatch();

  const {verificationCode} = useSelector(
    (state: RootState) => state.emailVerificationPage,
  );

  const onChangeHandler = (text: string) => {
    dispatch(setVerificationCode(text));
  };

  return {value: verificationCode, onChangeHandler};
};
