import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ContactUs from "../components/ContactUs";
const MessageShortcut = () => {
  const [MessageModal, setMessageModal] = useState(false);
  const showMessageModal = () => {
    setMessageModal(true);
  };
  return (
    <div>
      <Modal
        show={MessageModal}
        onHide={() => setMessageModal(false)}
        size="xl"
        centered
        backdrop={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ContactUs></ContactUs>
        </Modal.Body>
      </Modal>
      <div className="position-relative" style={{ zIndex: 1000 }}>
        <div
          className="position-fixed bottom-0 end-0 text-center me-3 mb-3"
          onClick={showMessageModal}
        >
          <i className="fa-solid fa-message messaging-icon"></i>
        </div>
      </div>
    </div>
  );
};

export default MessageShortcut;
