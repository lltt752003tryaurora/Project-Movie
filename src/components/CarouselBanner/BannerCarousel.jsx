import React, { useState } from "react";
import { Carousel } from "antd";
import TrailerModal from "../TrailerModal/TrailerModal";
import "./BannerCarousel.scss";

const contentStyle = {
  height: "900px",
  margin: 0,
  position: "relative",
  // color: "#fff",
  // lineHeight: "160px",
  // textAlign: "center",
  // background: "#364d79",
};

const trailerBanner = [
  <iframe
    width="100%"
    height="400"
    src="https://www.youtube.com/embed/uqJ9u7GSaYM"
    title='Phim "Bàn Tay Diệt Quỷ" Trailer | KC 09.04.2021'
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>,
  <iframe
    width="100%"
    height="400"
    src="https://www.youtube.com/embed/2EnP2tVC00Q"
    title='Phim "Lật Mặt 6: Tấm Vé Định Mệnh" Trailer | KC 28.04.2023'
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>,
  <iframe
    width="100%"
    height="400"
    src="https://www.youtube.com/embed/Eu9G8nO5-Ug"
    title="MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ - OFFICAL TRAILER"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>,
];

// console.log(trailerBanner);

const BannerCarousel = ({ listBanner }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // content chứa dữ liệu hiển thị cho modal khi ấn vào nút play
  const [contentModal, setContentModal] = useState("");

  return (
    <>
      <Carousel autoplay id="banner" effect="fade" arrows={true}>
        {listBanner.map((item, index) => {
          // console.log(item);
          // các slide có chiều cao chưa bằng nhau nên có khoảng trắng
          return (
            <div key={index}>
              {/* phải lồng thêm 1 thẻ div rồi lấy style, để tránh bị đè style của lick carousel */}
              <div
                className="cursor-pointer"
                style={contentStyle}
                onClick={() => {
                  // mở modal
                  setIsModalOpen(!isModalOpen);
                  // set dữ liệu cho content modal, dựa vào index của slide đang hiển thị để biết được đang ở tấm poster film nào
                  setContentModal(trailerBanner[index]);
                }}
              >
                {/* object-cover: làm tấm hình to ra, ko bị vỡ kích thước */}
                <img
                  className="h-full w-full object-cover"
                  src={item.hinhAnh}
                  alt=""
                />
                {/* muốn canh giữa 1 đối tượng thì ta cho top,left nhận 50% và translate cả 2 hướng là -50% */}
                <div className="icon_play absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[100px] hover:opacity-75 hover:transition hover:cursor-pointer">
                  <i className="fa-regular fa-circle-play"></i>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
      <TrailerModal
        // onCancel cho false để ẩn modal
        isModalOpen={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        contentModal={contentModal}
      />
    </>
  );
};

export default BannerCarousel;
