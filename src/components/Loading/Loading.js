import React from "react";
import Lottie from "react-lottie";

// import animation vào component
import * as loadingAnimation from "./../../asset/animation/loadingAnimation.json";

const Loading = () => {
  const defaultOptions = {
    loop: true, // lặp lại vô tận
    autoplay: true, // auto chạy
    animationData: loadingAnimation, // animation muốn chạy thì thêm vào đây
  };

  return (
    <div
      className="absolute h-screen top-0 left-0 w-full bg-slate-100 bg-opacity-30"
      style={{ zIndex: "9999" }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loading;
