import { https } from "./config";

export const quanLyPhimService = {
  // phương thức gọi dữ liệu các bộ film
  getAllBanner: () => {
    // tham số thứ nhất là endpoint của url được gọi
    // tham số thứ hai là data, data sẽ được truyền vào nếu api cần gửi dữ liệu lên cụ thể là phương thức post
    // ở đây là phương thức get nên k cần tham số thứ 2
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovie: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  deleteMovie: (maPhim) => {
    return https.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },
  addMovie: (data) => {
    return https.post("/api/QuanLyPhim/ThemPhimUploadHinh", data);
  },
  layThongTinLichChieuPhim: (maPhim) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  },
  layChiTietPhim: (maPhim) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
};
