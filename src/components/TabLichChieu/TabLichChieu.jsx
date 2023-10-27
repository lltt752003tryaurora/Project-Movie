import React, { useEffect, useState } from "react";
import { quanLyRapServic } from "../../services/quanLyRap";
import { Tabs } from "antd";
import moment from "moment";
import "../TabHeThongRap/TabHeThongRap.scss"

const TabLichChieu = ({ maHeThongRap }) => {
  const [listCumRap, setListCumRap] = useState([]);
  useEffect(() => {
    quanLyRapServic
      .layThongTinLichChieuHeThongRap(maHeThongRap)
      .then((res) => {
        console.log(res);
        setListCumRap(res.data.content[0].lstCumRap);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maHeThongRap]);
  // ở đây ko cần truyền vào tham số maHeThongRap cho useEffect, ta truyền vào để biết được sự thay đổi khi console.log(listCumRap); để kiểm tra dữ liệu
  console.log(listCumRap);

  return (
    <div>
      <Tabs
        tabPosition={"left"}
        items={listCumRap.map((item, index) => {
          return {
            label: (
              <div className="text-left w-72">
                <h4 className="truncate">{item.tenCumRap}</h4>
                <p className="truncate">{item.diaChi}</p>
              </div>
            ),
            // có thể truyền vào key index cũng được, nhưng để chắc chắn và rõ hơn thì truyền cái mã
            key: index,
            children: (
              <div
                className="space-y-4"
                style={{ height: "516px", overflowY: "auto" }}
              >
                {/* thêm dấu ? khi nếu có phim thì đổ ra, còn ko thì thôi */}
                {item.danhSachPhim?.map((phim, index) => {
                  return (
                    <div className="flex py-4">
                      <div className="mr-3">
                        <img
                          className="w-20 h-full object-cover"
                          src={phim.hinhAnh}
                          alt=""
                        />
                      </div>
                      <div>
                        <h5 className="text-xl font-medium">{phim.tenPhim}</h5>
                        {/* đổ lịch chiếu phim, do lịch chiếu nhiều nên ta dùng hàm slice để lấy ra 4 phần tử ban đầu để nó hiện ra */}
                        <div className="grid grid-cols-2 gap-3">
                          {phim.lstLichChieuTheoPhim
                            .slice(0, 4)
                            .map((lichchieu, index) => {
                              return (
                                <p
                                  key={index}
                                  className="py-2 px-4 bg-gray-100 border border-gray-400 rounded font-bold space-x-2"
                                >
                                  <span className="text-green-500">
                                    {moment(lichchieu.ngayChieuGioChieu).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </span>
                                  <span>~</span>
                                  <span className="text-orange-400">
                                    {moment(lichchieu.ngayChieuGioChieu).format(
                                      "hh:mm"
                                    )}
                                  </span>
                                </p>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ),
          };
        })}
        className="tabLichChieu"
      />
    </div>
  );
};

export default TabLichChieu;
