import React from "react";
import Lottie from "react-lottie";

// import animation vào component
import * as filmAnimation from "../../../asset/animation/filmAnimation.json";

const PhimAnimation = () => {
  const defaultOptions = {
    loop: true, // lặp lại vô tận
    autoplay: true, // auto chạy
    animationData: filmAnimation, // animation muốn chạy thì thêm vào đây
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      height={100}
      width={100}
      style={{ margin: "0" }}
      // isStopped={this.state.isStopped}
      // isPaused={this.state.isPaused}
    />
  );
};

export default PhimAnimation;
