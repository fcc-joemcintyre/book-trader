/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './api';

const initialState: User = {
  authenticated: false,
  key: 0,
  username: '',
  email: '',
};

export const userSlice = createSlice ({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticated: (
      state,
      { payload: { authenticated, key, username, email } }: PayloadAction<User>
    ) => {
      state.authenticated = authenticated;
      state.key = key;
      state.username = username;
      state.email = email;
    },
  },
});

export const { setAuthenticated } = userSlice.actions;
