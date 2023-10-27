import React from "react";
import { useSelector } from "react-redux";
import CarouselMovie from "../CarouselMovie/CarouselMovie";

const ListMovie = () => {
  // lấy dữ liệu từ store
  const { listPhim } = useSelector((state) => state.phimSlice);
  console.log(listPhim);

  return (
    <div className="container mx-auto text-center py-20 listMovie">
      <h2 className="text-3xl font-bold">Danh sách các phim</h2>
      {/* layout list film */}
      <CarouselMovie listPhim={listPhim} />
    </div>
  );
};

export default ListMovie;
