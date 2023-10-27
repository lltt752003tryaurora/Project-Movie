import { DatePicker, Switch, message } from "antd";
import React from "react";
import { useFormik } from "formik";
import { Rate } from "antd";
import { quanLyPhimService } from "../../services/quanLyPhim";

const FormAddMovie = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      moTa: "",
      trailer: "",
      ngayKhoiChieu: "",
      sapChieu: true,
      dangChieu: true,
      hot: true,
      danhGia: 0,
      hinhAnh: {},
      maNhom: "GP07",
    },
    onSubmit: (values) => {
      console.log(values);
      const data = new FormData();
      // loop để đổ dữ liệu lên
      for (let key in values) {
        // console.log(key);
        if (key !== "hinhAnh") {
          data.append(key, values[key]);
        } else {
          // vì backend yêu cầu data truyền lên tên phải là File
          data.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      quanLyPhimService
        .addMovie(data)
        .then((res) => {
          console.log(res);
          messageApi.success("Thêm phim thành công");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.statusCode == 500) {
            messageApi.error(
              "Tên phim trùng hoặc upload file ảnh không hợp lệ !"
            );
          } else {
            messageApi.error("Thêm phim thất bại");
          }
        });
    },
  });

  const { handleSubmit, handleChange, values, handleBlur, setFieldValue } =
    formik;

  return (
    <>
      {contextHolder}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            for="maNhom"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mã nhóm
          </label>
          <input
            type="text"
            id="maNhom"
            name="maNhom"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập tên phim"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.maNhom}
          />
        </div>
        <div>
          <label
            for="tenPhim"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tên phim
          </label>
          <input
            type="text"
            id="tenPhim"
            name="tenPhim"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập tên phim"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tenPhim}
          />
        </div>
        <div>
          <label
            for="trailer"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Trailer
          </label>
          <input
            type="text"
            id="trailer"
            name="trailer"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập trailer"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.trailer}
          />
        </div>
        <div>
          <label
            for="moTa"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Mô tả
          </label>
          <input
            type="text"
            id="moTa"
            name="moTa"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập mô tả"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.moTa}
          />
        </div>
        <div>
          <label
            for="ngayKhoiChieu"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Ngày khởi chiếu
          </label>
          <DatePicker
            name="ngayKhoiChieu"
            format={"DD/MM/YYYY"}
            onChange={(day, dateString) => {
              //dateString: dữ liệu đang có trên input
              setFieldValue("ngayKhoiChieu", dateString);
            }}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label
            for="dangChieu"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Đang chiếu
          </label>
          <Switch
            defaultChecked
            onChange={(checked, event) => {
              // setFieldValue giúp ta lấy dữ liệu những tag ko có name
              // checked: boolean
              setFieldValue("dangChieu", checked);
            }}
          />
        </div>
        <div>
          <label
            for="sapChieu"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Sắp chiếu
          </label>
          <Switch
            defaultChecked
            onChange={(checked, event) => {
              setFieldValue("sapChieu", checked);
            }}
          />
        </div>
        <div>
          <label
            for="hot"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Hot
          </label>
          <Switch
            defaultChecked
            onChange={(checked, event) => {
              setFieldValue("hot", checked);
            }}
          />
        </div>
        <div>
          <label
            for="danhGia"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Đánh giá
          </label>
          <Rate
            onChange={(value) => {
              setFieldValue("danhGia", value);
            }}
            value={values.danhGia}
          />
          ;
        </div>
        <div>
          <label
            for="hinhAnh"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Hình ảnh
          </label>
          <input
            type="file"
            name="hinhAnh"
            onChange={(event) => {
              console.log(event.target.files);
              setFieldValue("hinhAnh", event.target.files[0]);
            }}
            onBlur={handleBlur}
          />
          <img src="" alt="" />
        </div>
        <div className="my-4">
          <button
            type="submit"
            className="bg-blue-500 font-bold text-white rounded py-2 px-5 hover:bg-blue-700"
          >
            Thêm phim
          </button>
        </div>
      </form>
    </>
  );
};

export default FormAddMovie;
