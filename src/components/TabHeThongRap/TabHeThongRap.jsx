import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { quanLyRapServic } from "../../services/quanLyRap";
import TabLichChieu from "../TabLichChieu/TabLichChieu";
import "./TabHeThongRap.scss";

const TabHeThongRap = () => {
  const [listHeThongRap, setListHeThongRap] = useState([]);
  const [truyenMaHeThongRap, setTruyenMaHeThongRap] = useState("");
  // gọi dữ liệu về
  useEffect(() => {
    quanLyRapServic
      .layThongTinHeThongRap()
      .then((res) => {
        console.log(res);
        // khi gọi data thành công lưu vào
        setListHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto tabHeThongRap my-2">
      <Tabs
        className="border border-gray-500"
        tabPosition={"left"}
        // items={new Array(3).fill(null).map((_, i) => {
        //   const id = String(i + 1);
        //   return {
        //     label: `Tab ${id}`,
        //     key: id,
        //     children: `Content of Tab ${id}`,
        //   };
        // })}
        items={listHeThongRap.map((item, index) => {
          return {
            label: <img className="w-10 h-10" src={item.logo} alt="logo" />,
            // có thể truyền vào key index cũng được, nhưng để chắc chắn và rõ hơn thì truyền cái mã
            key: item.maHeThongRap,
            children: <TabLichChieu maHeThongRap={item.maHeThongRap} />,
            // children: <TabLichChieu maHeThongRap={truyenMaHeThongRap} />, // cách này sẽ bị độ trễ khi gọi từ server (do dùng state, khi bấm tab thì component render lại chờ api gọi data xong)
          };
        })}
        // onChange={(activeKey) => {
        //   // mỗi lần ấn tab thì sẽ trả về cái key tương ứng với mình gọi ở trên là item.maHeThongRap
        //   console.log(activeKey);
        //   setTruyenMaHeThongRap(activeKey);
        // }}
      />
    </div>
  );
};

export default TabHeThongRap;
