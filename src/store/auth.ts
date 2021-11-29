import { createSlice } from '@reduxjs/toolkit';

interface TokenType {
  token: string;
}

const initialState: TokenType = {
  token: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToken(state, action) {
      state.token = action.payload;
    }
  }
});

export const { addToken } = authSlice.actions;

export default authSlice.reducer;
