import Search from "antd/es/input/Search";
import React, { useEffect } from "react";
import TablePhim from "../../components/TablePhim/TablePhim";
import { useDispatch } from "react-redux";
import { getAllMovieApi } from "../../redux/phimSlice";
import { useNavigate } from "react-router-dom";

const ListPhimAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // bắn lên store 1 cái dispatch
  useEffect(() => {
    // gọi dữ liệu API và bắn lên store
    dispatch(getAllMovieApi());
  }, []);

  return (
    <div className="bg-white p-10">
      <h2 className="text-3xl space-y-5 font-medium mb-5">Quản lí phim</h2>
      <button className="bg-green-500 text-white py-2 px-5 rounded hover:bg-slate-500 font-bold duration-300 mb-5" onClick={()=> {
        navigate("/admin/them-phim")
      }}>
        Thêm phim
      </button>
      <div>
        <Search
          placeholder="Tìm kiếm phim"
          // onSearch={onSearch}
        />
      </div>
      <TablePhim />
    </div>
  );
};

export default ListPhimAdmin;

// nếu là 1 người admin thì người ta sẽ ko qua trang user mà qua trang admin luôn. Ở đây ta ko lấy useSelector về luon mà dispatch thêm 1 lần nữa. lúc trước ta lấy useSelector dữ liệu về ở ListMovie.jsx ở đây data đang nằm ở trang user. Vì vậy ta mới dispatch gọi data lại ở trang admin (do 1 người admin thì đi thẳng tới trang admin luôn chứ ko có qua trang user làm gì cả :)), chứ nếu mà ko dispatch thì nếu ko qua trang user thì component chưa được render lên thì dữ liệu cũng chưa có
