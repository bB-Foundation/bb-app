import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type EmailVerificationPageState = {
  verificationCode: string;
  isSubmitting: boolean;
  isEmailVerified: boolean;
  isResendEmailUsed: boolean;
};

const initialState: EmailVerificationPageState = {
  verificationCode: '',
  isSubmitting: false,
  isEmailVerified: false,
  isResendEmailUsed: false,
};

const emailVerificationPageSlice = createSlice({
  name: 'emailVerificationPage',
  initialState,
  reducers: {
    setVerificationCode(state, {payload}: PayloadAction<string>) {
      state.verificationCode = payload;
    },
    setIsSubmitting(state, {payload}: PayloadAction<boolean>) {
      state.isSubmitting = payload;
    },
    verifyEmail(state, {payload}: PayloadAction<boolean>) {
      state.isEmailVerified = payload;
    },
    setResendEmailUsed(state, {payload}: PayloadAction<boolean>) {
      state.isResendEmailUsed = payload;
    },
    resetState: () => initialState,
  },
});

export const {
  setVerificationCode,
  setIsSubmitting,
  verifyEmail,
  setResendEmailUsed,
  resetState,
} = emailVerificationPageSlice.actions;
export const emailVerificationPage = emailVerificationPageSlice.reducer;
