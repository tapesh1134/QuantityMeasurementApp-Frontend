import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpen: false, view: 'login' }, // view: 'login' or 'signup'
  reducers: {
    openLogin: (state) => {
      state.isOpen = true;
      state.view = 'login';
    },
    openSignup: (state) => {
      state.isOpen = true;
      state.view = 'signup';
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openLogin, openSignup, closeModal } = modalSlice.actions;
export default modalSlice.reducer;