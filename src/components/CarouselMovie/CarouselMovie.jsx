import React, { useState } from "react";
import { Carousel } from "antd";
import "./CarouselMovie.scss";
import { createListIframeVideo } from "../../util/function/createListIframeVideo";
import TrailerModal from "../TrailerModal/TrailerModal";
import { useNavigate } from "react-router-dom";

const CarouselMovie = ({ listPhim }) => {
  console.log(listPhim);
  const arrIframeVideo = [];
  createListIframeVideo(listPhim, arrIframeVideo);
  console.log(arrIframeVideo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // content chứa dữ liệu hiển thị cho modal khi ấn vào nút play
  const [contentModal, setContentModal] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Carousel id="movie" arrows={true} slidesToShow={4} rows={2}>
        {listPhim.map((item, index) => {
          const { maPhim, hinhAnh, tenPhim, moTa } = item;
          return (
            <div
              key={index}
              className="p-5 border-black rounded-xl my-2"
              id="item-movie"
            >
              <div className="movieCarousel text-left relative cursor-pointer">
                <div className="w-full h-72 object-cover rounded-2xl relative bg-black">
                  <img
                    className="w-full h-72 object-cover rounded-2xl"
                    src={hinhAnh}
                    alt=""
                  />
                  <div
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                      setContentModal(arrIframeVideo[index]);
                    }}
                  >
                    <div className="overlay bg-black absolute top-0 left-0 right-0 bottom-0 opacity-0 rounded-2xl duration-200"></div>
                    <i className="icon_play fa-regular fa-circle-play text-white text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute opacity-0 duration-200 hover:text-slate-600"></i>
                  </div>
                </div>
                <div className="contentFilm">
                  <div className="movieTitle my-3 min-h-[64]">
                    <h3 className="text-2xl line-clamp-2 h-16">
                      <span className="text-white rounded bg-orange-500 p-1 mr-3">
                        C18
                      </span>
                      {tenPhim}
                    </h3>
                  </div>
                  <p className="description line-clamp-2 h-11">{moTa}</p>
                </div>
                <div className="w-full h-[132px] DatVe hidden py-5">
                  <div
                    className="w-full py-5 bg-red-700 text-white rounded-lg font-bold text-xl btn_DatVe duration-200 text-center hover:bg-red-500"
                    onClick={() => {
                      navigate(`/chi-tiet-phim/${maPhim}`);
                    }}
                  >
                    Đặt vé
                  </div>
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

export default CarouselMovie;
