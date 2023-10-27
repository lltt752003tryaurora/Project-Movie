import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingStarted: (state, action) => {
      state.isLoading = true;
    },
    setLoadingEnded: (state, action) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoadingStarted, setLoadingEnded } = loadingSlice.actions;

export default loadingSlice.reducer;
