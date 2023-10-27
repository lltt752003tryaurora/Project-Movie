import React from "react";
import { Popconfirm, message, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { quanLyPhimService } from "../../services/quanLyPhim";
import { getAllMovieApi } from "../../redux/phimSlice";

const confirm = (e) => {
  console.log(e);
  message.success("Bạn đã xóa thành công");
};
const cancel = (e) => {
  console.log(e);
  message.error("Bạn chưa xóa phim");
};

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

const TablePhim = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const columns = [
    // dataIndex dùng để đổ dữ liệu lên trong biến data, dataIndex phải trùng với thuộc tính bên trong listPhim để đổ dữ liệu lên đúng
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record, index) => {
        // text là dữ liệu của thuộc tính hinhAnh trong obj
        return <img src={text} alt="text" className="h-20 w-200" />;
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      // hàm render nhận 3 tham số text,record,index
      // text: dữ liệu của thuộc tính
      // record: nguyên thông tin 1 dòng (1 object)
      // index: vị trí
      // render: (text,record,index) => {

      // }
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button className="text-xl text-blue-500 hover:text-slate-500 duration-300">
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <Popconfirm
            title="Xóa phim"
            description="Bạn có chắc chắn muốn xóa phim này không ?"
            onConfirm={() => {
              console.log(record); // obj phim
              // xóa phim khỏi danh sách
              quanLyPhimService
                .deleteMovie(record.maPhim)
                .then((res) => {
                  console.log(res);
                  // nếu xóa thành công thì gọi dữ liệu mới về để render lại
                  dispatch(getAllMovieApi());
                  confirm();
                })
                .catch((err) => {
                  console.log(err);
                  messageApi.error(err.response.data.content);
                });
            }}
            onCancel={cancel}
            okText="Có"
            cancelText="Không"
            // nếu muốn onclick thì , sau className
            okButtonProps={{ className: "bg-red-500 hover:bg-red-700" }}
            cancelButtonProps={{
              className: "bg-green-500 text-white hover:bg-green-700",
            }}
          >
            <button className="text-xl text-red-400 hover:text-red-800 duration-300">
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // state đại diện cho reducer
  const { listPhim } = useSelector((state) => state.phimSlice);
  console.log(listPhim);
  return (
    <div>
      <Table columns={columns} dataSource={listPhim} />
    </div>
  );
};

export default TablePhim;
