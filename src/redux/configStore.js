import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import phimSlice from "./phimSlice";
import loadingSlice from "./loadingSlice";

const store = configureStore({
  reducer: {
    userSlice,
    phimSlice,
    loadingSlice,
  },
});

export default store;
