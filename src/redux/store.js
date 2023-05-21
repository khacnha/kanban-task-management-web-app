import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import themeSlice from "./themeSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
    theme: themeSlice.reducer,
    auth:authSlice.reducer,
    devTools: true
  }
})

export default store
