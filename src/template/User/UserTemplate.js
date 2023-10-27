import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";

const UserTemplate = () => {
  // dùng useSelector để gọi isLoading về
  const { isLoading } = useSelector((state) => state.loadingSlice);
  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default UserTemplate;
