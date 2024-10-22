import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type UserProfilePageState = {
  isLoading: boolean;
};

const initialState: UserProfilePageState = {
  isLoading: false,
};

const userProfilePageSlice = createSlice({
  name: 'userProfilePage',
  initialState,
  reducers: {
    setIsLoading(state, {payload}: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
  },
});

export const {setIsLoading} = userProfilePageSlice.actions;
export const userProfilePage = userProfilePageSlice.reducer;
