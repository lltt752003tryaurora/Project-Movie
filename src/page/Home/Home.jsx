import React, { useEffect, useState } from "react";
import { quanLyPhimService } from "../../services/quanLyPhim";
import ListMovie from "../../components/ListMovie/ListMovie";
import { useDispatch } from "react-redux";
import { getAllMovieApi } from "../../redux/phimSlice";
import BannerCarousel from "../../components/CarouselBanner/BannerCarousel";
import TabHeThongRap from "../../components/TabHeThongRap/TabHeThongRap";
import { setLoadingEnded, setLoadingStarted } from "../../redux/loadingSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [listBanner, setListBanner] = useState([]);
  useEffect(() => {
    // gọi loading xuất hiện khi chạy component
    dispatch(setLoadingStarted());
    quanLyPhimService
      .getAllBanner()
      .then((result) => {
        // xem data trả về cái gì
        console.log(result);
        // khi gọi data thành công, cho data là mảng film gồm 3 phần tử trong content vào listBanner
        setListBanner(result.data.content);
        // lấy dữ liệu xong thì ko loading nữa
        dispatch(setLoadingEnded());
      })
      .catch((err) => {
        console.log(err);
        // lỗi cũng tắt đi
        dispatch(setLoadingEnded());
      });
    // đưa dữ liệu lên store
    dispatch(getAllMovieApi());
  }, []);
  return (
    <div>
      <BannerCarousel listBanner={listBanner} />
      <ListMovie />
      <TabHeThongRap />
    </div>
  );
};

export default Home;
