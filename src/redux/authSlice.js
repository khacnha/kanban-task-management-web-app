import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../core/api";

const token =  localStorage.getItem('token');
const initialState = {
  isLoggedIn: token ? true: false,
  error: "",
  token: token
};
export const login = createAsyncThunk(
  "login/post",
  async ({ username, password }) => {
    try {
      console.log(username, password);
      const response = await auth.login(username, password);
      localStorage.setItem('token', response.token);
      return {
        isLoggedIn: true,
        error: "",
        token: response.token
      };
    } catch (e) {
      console.log(e);
      return {
        isLoggedIn: false,
        error: "Unable to log in with provided credentials!",
        token: ""
      };
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('token');

      state.error = "";
      state.isLoggedIn = false;
      state.token = "";
    },
  }
});

export default authSlice;
