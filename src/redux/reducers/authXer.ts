import Cookies from "js-cookie";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthInterface {
  user: {
    username: string | null;
  };
}

const initialState: AuthInterface = {
  user: {
    username: Cookies.get("_un") || null,
  },
};

export const authXer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthInterface>) => {
      state.user = action.payload.user;
      Cookies.set("_un", action.payload.user.username ?? "", {
        expires: 1,
      });
    },
    logout: (state) => {
      state.user.username = null;
      Cookies.remove("_un");
    },
  },
});

export const { login, logout } = authXer.actions;
export default authXer.reducer;
