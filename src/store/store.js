import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import modalReducer from './modalSlice';
import quantityReducer from './quantitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    quantity: quantityReducer,
  },
});