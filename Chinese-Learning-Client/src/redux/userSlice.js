import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // other user-related reducers
    removeUser: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
