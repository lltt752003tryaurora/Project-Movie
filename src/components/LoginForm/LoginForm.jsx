/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { quanLyNguoiDungServ } from "../../services/quanLyNguoiDung";
import { saveLocalStore } from "../../util/localStore";
import { message } from "antd";
import { TOKEN, USER_LOGIN } from "../../util/constant/settingSystem";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // values sẽ chứa 2 trường data là taiKhoan và matKhau
      // nhớ check bất đồng bộ then và catch khi gọi API
      // ta sẽ lưu thông tin tại localStorage chống reload mất thông tin
      // sau khi lưu, chuyển hướng về trang chủ, và ẩn login của user đi
      quanLyNguoiDungServ
        .dangNhap(values)
        .then((res) => {
          // thành công sẽ trả về data của user đó (nếu trên API có )
          console.log(res);
          // lấy data user và lưu xuống localStorage
          saveLocalStore(USER_LOGIN, res.data.content);
          saveLocalStore(TOKEN, res.data.content.accessToken);
          // thông báo cho user đăng nhập thành công
          messageApi.success("Đăng nhập thành công");
          // delay 1 xíu cho user thấy thông báo message rồi navigate về lại trang chủ
          setTimeout(() => {
            navigate("/");
            window.location.reload(true);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          // thông báo cho user đăng nhập thất bại
          messageApi.error(err.response.data.content);
        });
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Vui lòng không bỏ trống !"),
      matKhau: Yup.string().required("Vui lòng không bỏ trống !"),
    }),
  });

  const { handleSubmit, handleChange, values, handleBlur, errors, touched } =
    formik;
  // handleBlur: giúp user khi nhập input sai thì vẫn focus vào ô input đó, khi nào trỏ con chuột ra ngoài mới mất focus
  return (
    <>
      {contextHolder}
      <section className="dark:bg-brown-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to={"/"}
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            rel="noreferrer"
          >
            <i className="fa-solid fa-film text-black hover:text-slate-600  duration-100">
              {" "}
              <span> Project Movie</span>
            </i>
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Đăng nhập vào tài khoản
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  {/* label trùng với id của input thì khi bấm vào text của label đó thì focus vào input đó */}
                  <label
                    htmlFor="taiKhoan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white hover:text-orange-400 duration-200"
                  >
                    <i className="fa-regular fa-user"></i>
                    <span> Tài khoản</span>
                  </label>
                  <input
                    type="text"
                    name="taiKhoan"
                    id="taiKhoan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative z-0"
                    placeholder="Nhập tài khoản"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.taiKhoan && errors.taiKhoan ? (
                    <p className="text-red-500 mt-2">{errors.taiKhoan}</p>
                  ) : null}
                </div>
                <div className="relative">
                  <label
                    htmlFor="matKhau"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white hover:text-orange-400 duration-200"
                  >
                    <i className="fa-solid fa-lock"></i>
                    <span> Mật khẩu</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="matKhau"
                    id="matKhau"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div
                    className="absolute top-9 right-4 cursor-pointer z-10"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <i class="fa-regular fa-eye hover:text-green-500 transition-all ease-in"></i>
                    ) : (
                      <i class="fa-regular fa-eye-slash hover:text-red-500 transition-all ease-in"></i>
                    )}
                  </div>
                  {touched.matKhau && errors.matKhau ? (
                    <p className="text-red-500 mt-2">{errors.matKhau}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800 ease-in duration-300"
                >
                  Đăng nhập
                </button>

                <button
                  type="button"
                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-primary-800 ease-in duration-300"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Đăng ký{" "}
                </button>

                <button
                  type="button"
                  className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-primary-800 ease-in duration-300"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Trở lại trang chủ{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
