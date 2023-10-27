// đây là nơi lấy và lưu lại data của user ở localStorage

import { createSlice } from "@reduxjs/toolkit";

const dataUserLocal = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: dataUserLocal,
};

const userSlice = createSlice({
  // name để tạo type và bắn sự kiện dispatch lên
  name: "user",
  initialState,
  reducers: {
    // phương thức để bắn dữ liều user ở Local lên
    setDataUser: (state, action) => {
      console.log(action);
      // lấy dữ liệu bên trong action truyền vào cho user
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataUser } = userSlice.actions;

export default userSlice.reducer;
