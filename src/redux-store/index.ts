import {configureStore} from '@reduxjs/toolkit';

import {questsPage} from './slices';

const store = configureStore({
  reducer: {
    questsPage,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
