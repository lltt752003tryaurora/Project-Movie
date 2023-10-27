import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setDataUser } from "../../redux/userSlice";
import useWindowSize from "../../hooks/useWindowSize";
import HeaderMobile from "./HeaderMobile";
import DropDownMenu from "../../page/UserPage/DropDownMenu/DropDownMenu";

const Header = () => {
  // bắn dữ liệu lên store bằng dispatch
  const dispatch = useDispatch();
  // lấy dữ liệu từ redux
  const { user } = useSelector((state) => state.userSlice);
  // console.log(user);

  // hooks useWindowSize hỗ trợ kiểm tra màn hình để responsive
  const { widthWindow, heightWindow } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  // Dùng cái này để khi đăng nhập xong thì ko cần reload trang thì tên người dùng hiện ra
  useEffect(() => {
    // gọi dữ liệu từ localStore lên
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (userLocal) {
      // bắn dữ liệu lên từ localStorage
      dispatch(setDataUser(userLocal));
    }
  }, []);

  // console.log(isMobile);

  // chạy liên tục khi useEffect ko có tham số
  useEffect(() => {
    // console.log(widthWindow);
    // console.log(heightWindow);
    // nếu widthWindow nhỏ hơn or bằng thì 576px thì setIsMobile (true)
    if (widthWindow <= 576) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });

  return isMobile ? (
    <HeaderMobile />
  ) : (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* eslint-disable-next-line */}
          <Link to={"/"} className="flex items-center" target="_blank">
            <i className="fa-solid fa-film mr-4 text-white"></i>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              WrisTryAurora
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {user ? (
              <>
                <DropDownMenu />
              </>
            ) : (
              <>
                <Link
                  to={"/sign-in"}
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Đăng nhập
                </Link>
                <Link
                  to={"/sign-up"}
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Đăng ký
                </Link>
              </>
            )}

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#t"
                  className="block py-2 pr-4 pl-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 duration-100"
                >
                  Lịch chiếu
                </a>
              </li>
              <li>
                <a
                  href="#t"
                  className="block py-2 pr-4 pl-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 duration-100"
                >
                  Cụm rạp
                </a>
              </li>
              <li>
                <a
                  href="#t"
                  className="block py-2 pr-4 pl-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 duration-100"
                >
                  Tin tức
                </a>
              </li>
              <li>
                <a
                  href="#t"
                  className="block py-2 pr-4 pl-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 duration-100"
                >
                  Ứng dụng
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
