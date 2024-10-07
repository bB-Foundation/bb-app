import {useSelector} from 'react-redux';
import {RootState} from 'src/redux-store';

export const useButtonLogic = () => {
  const {verificationCode, isSubmitting} = useSelector(
    (state: RootState) => state.emailVerificationPage,
  );

  const isValidVerificationCode = verificationCode.length === 6;

  return {
    isValidVerificationCode,
    isSubmitting,
  };
};
