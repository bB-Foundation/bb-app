import {configureStore} from '@reduxjs/toolkit';

import {emailVerificationPage, questsPage} from './slices';

const store = configureStore({
  reducer: {
    questsPage,
    emailVerificationPage,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
