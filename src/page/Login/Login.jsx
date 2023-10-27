import React from "react";
import LoginAnimation from "../../components/LoginAnimation/LoginAnimation";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="grid grid-cols-2 h-screen bg-green-100">
      {/* animation */}
      <div className="layout_animation flex justi items-center">
        <LoginAnimation />
      </div>
      {/* login form */}
      <div className="layout_loginForm bg-blue-100">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
