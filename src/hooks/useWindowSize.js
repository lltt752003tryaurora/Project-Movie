import { useEffect, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    widthWindow: 1300,
    heightWindow: 1300,
  });

  useEffect(() => {
    const handleSizeWindow = () => {
      setWindowSize({
        // innerWidth, innerHeight là chiều cao và chiều dài của trình duyệt đang sử dụng
        widthWindow: window.innerWidth,
        heightWindow: window.innerHeight,
      });
    };
    handleSizeWindow();
    // chạy hàm handleSizeWindow để bắt được chiều dài và chiều cao thiết bị khi giao diện thay đổi
    window.addEventListener("resize", handleSizeWindow);
    return () => {
      // xóa bỏ hàm handleSizeWindow khi component không còn xuất hiện trên giao diện
      window.removeEventListener("resize", handleSizeWindow);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
