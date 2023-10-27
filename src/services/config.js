import axios from "axios";
import { URL_DOMAIN, TokenCybersoft } from "../util/constant/settingSystem";

const userData = JSON.parse(localStorage.getItem("user"));

//   request gửi data lên backend, response lấy data về

// cấu hình axios
// Add a request interceptor
export const https = axios.create();
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return {
      ...config,
      headers: {
        TokenCybersoft,
        // lưu ý: khi lấy dữ liệu từ local mà ko có tài khoản user => ko có accessToken. Nên ta mới thêm dấu ? để check xem có hay ko
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      baseURL: URL_DOMAIN,
    };
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
