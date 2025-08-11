import { createSlice } from "@reduxjs/toolkit";

interface AuthSlice {
  token: string | null;
}

const initialState: AuthSlice = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
