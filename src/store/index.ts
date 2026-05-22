import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // сюда позже добавим slice-ы
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
