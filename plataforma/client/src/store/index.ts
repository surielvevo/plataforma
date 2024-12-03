import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import investigationReducer from './slices/investigationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    investigations: investigationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 