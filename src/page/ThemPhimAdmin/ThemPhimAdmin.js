import React from "react";
import FormAddMovie from "../../components/FormAddMovie/FormAddMovie";

const ThemPhimAdmin = () => {
  return (
    <div className="bg-white p-10 space-y-5">
      <h2 className="text-2xl font-medium">Thêm mới phim</h2>
      <FormAddMovie />
    </div>
  );
};

export default ThemPhimAdmin;
