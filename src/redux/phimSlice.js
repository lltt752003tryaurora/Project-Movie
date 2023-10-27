// đây là nơi lấy và lưu lại data của danh sách phim

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyPhimService } from "../services/quanLyPhim";

const initialState = {
  listPhim: [],
  detailPhim: {},
};

// đây là thunk giúp xử lí các bất đồng bộ và nhận một kết quả trả về trước khi đi vào bên trong store và xử lí
// trong hàm async có thể truyền tham số, khi truyền tham số thì qua hàm dispatch ta cũng truyền tham số tương ứng để lấy dữ liệu -> áp dụng cho việc lấy id
export const getAllMovieApi = createAsyncThunk(
  "phim/getAllMovieApi",
  async () => {
    const res = await quanLyPhimService.getAllMovie();
    // kiểm tra data trả về là gì => console.log nó ra
    console.log(res);
    return res.data.content;
  }
);

// Lúc trước, muốn bắn dữ liệu lên thì data đó phải nằm dưới component của ta trước sau đó mới dùng phương thức dispatch để đẩy dữ liệu lên trên store

// redux thunk giúp ta xử lí gọi dữ liệu lên và bắn thẳng lên redux. Nó là nơi trung gian giữa component và store của chúng ta, nó gọi dữ liệu và bắn phương thức dispatch gửi data lên store. Sau đó trên store sử dụng phương thức extraReducers để nhận dữ liệu từ redux thunk

const phimSlice = createSlice({
  // name để tạo type và bắn sự kiện dispatch lên
  name: "phim",
  initialState,
  // trong reducers ko được phép viết những gì bất đồng bộ bên trong, do đó người ta tạo ra redux thunk
  reducers: {},
  // đưa các data trong getAllMovieApi vào listFilm ta dùng
  extraReducers: (builder) => {
    // có 3 trạng thái gọi dữ liệu: success,fail, running chưa xong
    builder.addCase(getAllMovieApi.fulfilled, (state, action) => {
      // xử lí khi gọi dữ liệu thành công
      console.log(action);
      state.listPhim = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = phimSlice.actions;

export default phimSlice.reducer;
