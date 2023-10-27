// react-router-dom
import { Routes, Route } from "react-router-dom";

// ant design
import UserTemplate from "./template/User/UserTemplate";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import AdminTemplate from "./template/Admin/AdminTemplate";
import ListPhimAdmin from "./page/ListPhimAdmin/ListPhimAdmin";
import SignUp from "./page/SignUp/SignUp";
import ThemPhimAdmin from "./page/ThemPhimAdmin/ThemPhimAdmin";
import ChiTietPhim from "./page/ChiTiet/ChiTietPhim/ChiTietPhim";
import BookTickets from "./page/BookTickets/BookTickets";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<Home />} />
          <Route path="chi-tiet-phim">
            <Route path=":maPhim" element={<ChiTietPhim />} />
          </Route>
        </Route>
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="admin" element={<AdminTemplate />}>
          <Route path="list-phim" element={<ListPhimAdmin />} />
          <Route path="them-phim" element={<ThemPhimAdmin />} />
        </Route>
        <Route path="book-ticket" element={<BookTickets />} />
      </Routes>
    </>
  );
}

export default App;
