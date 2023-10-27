import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import * as Yup from "yup";
import { quanLyNguoiDungServ } from "../../services/quanLyNguoiDung";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      hoTen: "",
      taiKhoan: "",
      soDt: "",
      email: "",
      matKhau: "",
      xacNhanMatKhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const { taiKhoan, matKhau, email, soDt, hoTen } = values;
      const valuesLimit = { taiKhoan, matKhau, email, soDt, hoTen };
      console.log(valuesLimit);
      quanLyNguoiDungServ
        .dangKy(valuesLimit)
        .then((res) => {
          console.log(res);
          messageApi.success("Đăng ký thành công");
          setTimeout(() => {
            navigate("/sign-in");
            // window.location.reload(true);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.content) {
            messageApi.error(err.response.data.content);
          } else {
            messageApi.error("Đăng ký thất bại");
          }
        });
    },
    validationSchema: Yup.object().shape({
      hoTen: Yup.string().required("Bạn cần nhập vào thông tin này"),
      taiKhoan: Yup.string().required("Bạn cần nhập vào thông tin này"),
      email: Yup.string()
        .required("Bạn cần nhập vào thông tin này")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ."),
      soDt: Yup.string()
        .required("Bạn cần nhập vào thông tin này")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Số điện thoại không hợp lệ."
        ),
      matKhau: Yup.string()
        .required("Bạn cần nhập vào thông tin này")
        .matches(
          /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.*[A-Z]).{6,12}$/,
          "Mật khẩu phải chứa 6-12 từ, 1 ký hiệu đặc biệt và 1 chữ hoa."
        ),
      xacNhanMatKhau: Yup.string()
        .required("Bạn cần nhập vào thông tin này")
        .oneOf([Yup.ref("matKhau"), null], "Mật khẩu không khớp."),
    }),
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;
  return (
    <>
      {contextHolder}
      <section className="dark:bg-slate-400">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to={"/"}
            className="flex items-center mb-2 text-2xl font-semibol text-white"
          >
            <i className="fa-solid fa-diagram-project text-black hover:text-slate-600  duration-100">
              <span> Project Movie</span>
            </i>
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3 space-y-1 md:space-y-2 sm:p-6 shadow-2xl">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Tạo tài khoản mới
              </h1>
              <form onSubmit={handleSubmit} className="space-y-2 md:space-y-2">
                <div>
                  <label
                    htmlFor="taiKhoan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tài khoản
                  </label>
                  <input
                    type="text"
                    name="taiKhoan"
                    id="taiKhoan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.taiKhoan && errors.taiKhoan ? (
                    <p className="text-red-500">{errors.taiKhoan}</p>
                  ) : null}
                </div>
                <div className="flex gap-3 justify-between">
                  <div>
                    <label
                      htmlFor="hoTen"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Họ tên
                    </label>
                    <input
                      type="hoTen"
                      name="hoTen"
                      id="hoTen"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.hoTen && errors.hoTen ? (
                      <p className="text-red-500">{errors.hoTen}</p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="soDt"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="soDt"
                      name="soDt"
                      id="soDt"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Số điện thoại"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.soDt && errors.soDt ? (
                      <p className="text-red-500">{errors.soDt}</p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email ? (
                    <p className="text-red-500">{errors.email}</p>
                  ) : null}
                </div>
                <div className="relative md:col-span-5">
                  <label
                    htmlFor="matKhau"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="matKhau"
                    id="matKhau"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative z-0"
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
                      <i className="fa-regular fa-eye hover:text-green-500 transition-all ease-in"></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash hover:text-red-500 transition-all ease-in"></i>
                    )}
                  </div>
                  {touched.matKhau && errors.matKhau ? (
                    <p className="text-red-500">{errors.matKhau}</p>
                  ) : null}
                </div>
                <div className="relative md:col-span-5">
                  <label
                    htmlFor="xacNhanMatKhau"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="xacNhanMatKhau"
                    id="xacNhanMatKhau"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative z-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div
                    className="absolute top-9 right-4 cursor-pointer z-10"
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  >
                    {showConfirmPassword ? (
                      <i className="fa-regular fa-eye hover:text-green-500 transition-all ease-in"></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash hover:text-red-500 transition-all ease-in"></i>
                    )}
                  </div>
                  {touched.xacNhanMatKhau && errors.xacNhanMatKhau ? (
                    <p className="text-red-500">{errors.xacNhanMatKhau}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800 ease-in duration-300"
                >
                  Đăng ký
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Đã có tài khoản ?<span> </span>
                  <Link
                    to={"/sign-in"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-green-400 duration-300"
                  >
                    Đăng nhập tại đây
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpForm;
