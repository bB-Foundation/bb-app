import {configureStore} from '@reduxjs/toolkit';

import {emailVerificationPage, questsPage, userProfilePage} from './slices';

const store = configureStore({
  reducer: {
    questsPage,
    emailVerificationPage,
    userProfilePage,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
