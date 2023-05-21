import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, userApi } from "../core/api";

const token = localStorage.getItem('token');
const initialState = {
  isLoggedIn: token ? true : false,
  error: "",
  token: token,
  profile: null
};
export const login = createAsyncThunk(
  "login/post",
  async ({ username, password }) => {
    try {
      const response = await auth.login(username, password);
      localStorage.setItem('token', response.token);

      const user = await userApi.getMe()

      return {
        isLoggedIn: true,
        error: "",
        token: response.token,
        profile: user
      };
    } catch (e) {
      console.log(e);
      return {
        isLoggedIn: false,
        error: "Unable to log in with provided credentials!",
        token: "",
        profile: null
      };
    }
  }
);

export const getMe = createAsyncThunk(
  "users/me",
  async () => {
    const user = await userApi.getMe()
    return user;

  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return action.payload;
    },
    [getMe.fulfilled]: (state, action) => {
      state.profile = action.payload
    },
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('token');

      state.error = "";
      state.isLoggedIn = false;
      state.token = "";
      state.profile = null
    },
  }
});

export default authSlice;
