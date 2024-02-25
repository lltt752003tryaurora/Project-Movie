import { https } from "./config";

export const quanLyRapServic = {
  layThongTinHeThongRap: () => {
    return https.get("/api/QuanLyRap/LayThongTinHeThongRap");
  },
  layThongTinLichChieuHeThongRap: (maHeThongRap) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP07`
    );
  },
};
