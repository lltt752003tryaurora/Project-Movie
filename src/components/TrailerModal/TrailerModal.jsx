import { Modal } from "antd";

const TrailerModal = ({ isModalOpen, onCancel, contentModal }) => {

  return (
    <Modal
      title="Trailer Film"
      open={isModalOpen}
      onCancel={onCancel}
      footer={null}
      width={1000}
      // afterClose: Specify a function that will be called when modal is closed completely
      afterClose={() => {
        // giúp ngăn video ko chạy nữa khi user tắt modals hiện film
        let iframe = document.querySelector("iframe");
        console.log(iframe.src);
        if (iframe) {
          let src = iframe.src;
          iframe.src = src;
        }
      }}
    >
      {contentModal}
    </Modal>
  );
};

export default TrailerModal;
