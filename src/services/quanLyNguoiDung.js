// gọi api đăng nhập

import { https } from "./config";

export const quanLyNguoiDungServ = {
  // data sẽ là 2 trường dữ liệu tài khoản và mật khẩu
  dangNhap: (data) => {
    // data = {
    //   taiKhoan: "",
    //   matKhau: "",
    // };
    return https.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
  dangKy: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", data);
  },
};
