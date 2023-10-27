import React from "react";
import Lottie from "react-lottie";

// import animation vào component
import * as loginAnimation from "./../../asset/animation/loginAnimation.json";

const LoginAnimation = () => {
  const defaultOptions = {
    loop: true, // lặp lại vô tận
    autoplay: true, // auto chạy
    animationData: loginAnimation, // animation muốn chạy thì thêm vào đây
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      height={400}
      width={400}
      // isStopped={this.state.isStopped}
      // isPaused={this.state.isPaused}
    />
  );
};

export default LoginAnimation;
