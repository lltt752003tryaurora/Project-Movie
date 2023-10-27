import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { quanLyPhimService } from "../../../services/quanLyPhim";
import { message } from "antd";
import PhimAnimation from "../phimAnimation/PhimAnimation";
import { modifyDate } from "../../../util/function/modifydate";
import RatingFilm from "./RatingFilm";
import TrailerModal from "../../../components/TrailerModal/TrailerModal";
import { extractVideoId } from "../../../util/function/createListIframeVideo";

const ChiTietPhim = () => {
  const param = useParams();
  console.log(param.maPhim);
  const [chiTietPhim, setChiTietPhim] = useState({});
  const [srcVideo, setSrcVideo] = useState("");

  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("");

  console.log(chiTietPhim);

  const {
    tenPhim,
    ngayKhoiChieu,
    moTa,
    hinhAnh,
    dangChieu,
    hot,
    danhGia,
    trailer,
  } = chiTietPhim;

  useEffect(() => {
    quanLyPhimService
      .layChiTietPhim(param.maPhim)
      .then((res) => {
        console.log(res);
        setChiTietPhim(res.data.content);
        var videoId = extractVideoId(trailer);
        setSrcVideo(videoId);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(videoId);
  }, [param.maPhim]);

  console.log(srcVideo);

  const iframeVideo = (
    <iframe
      width="100%"
      height="400"
      src={`https://www.youtube.com/embed/${srcVideo}`}
      title={tenPhim}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  );
  // console.log(iframeVideo);

  const khoiChieu = modifyDate(ngayKhoiChieu);
  return (
    <>
      {contextHolder}
      <div className="bg-[#0a2029] h-[800px] text-white">
        <div className="pt-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-10 p-6 bg-slate-700 rounded-3xl">
              <div className="col-span-3">
                <img src={hinhAnh} alt="" className="rounded-lg w-full h-full object-cover" />
              </div>
              <div className="contentPhim col-span-7">
                <div className="ml-6 space-y-2">
                  <h1 className="text-3xl mb-5 font-bold">{tenPhim}</h1>
                  <hr className="opacity-50" />
                  <p className="mt-3">Khởi chiếu: {khoiChieu}</p>
                  <p>Tình trạng: {dangChieu ? "Đang chiếu" : "Hết chiếu"}</p>
                  <p>
                    Chế độ:
                    {hot ? (
                      <img
                        src="https://cinestar.com.vn/catalog/view/theme/default/images/nav-icon-2d.png"
                        alt="icon2d"
                        className="mt-2"
                      />
                    ) : (
                      <img
                        src="https://cinestar.com.vn/catalog/view/theme/default/images/nav-icon-3d.png"
                        alt="icon3d"
                        className="mt-2"
                      />
                    )}
                  </p>
                  <p>{moTa}</p>
                </div>
                <div className="rating mt-0">
                  <div className="animation text-left flex items-center">
                    <PhimAnimation />
                    <RatingFilm rating={danhGia} />
                  </div>
                </div>
                <div className="flex justify-center gap-5 mt-6">
                  <div
                    className="flex items-center text-white bg-slate-800 bg-opacity-50 hover:bg-black rounded-[30px] duration-300 cursor-pointer"
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                      setContentModal(iframeVideo);
                    }}
                  >
                    <img
                      className="w-14 h-14"
                      src="https://cinestar.com.vn/catalog/view/theme/default/images/icon-play.png"
                      alt="icon-ytb"
                    />
                    <span className="text-xl font-bold pr-5">TRAILER</span>
                  </div>
                  <button className="bg-cyan-600 rounded-[30px] px-10 text-xl font-bold duration-300 hover:text-black hover:bg-slate-400">
                    ĐẶT VÉ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default ChiTietPhim;
