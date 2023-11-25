import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import "./styles/Toast.css";
const MyToast = ({ text, showHandler }) => {
  const [Show, setShow] = useState(showHandler);

  useEffect(() => {
    setShow(showHandler);
  }, [showHandler]);
  return (
    <div className="row">
      <div className="mb-2 col-md-6">
        <Modal show={Show} onHide={() => setShow(false)} className="toast" animation={true} >
          <Modal.Header closeButton  className="toast-header">
            <Modal.Title>
              <strong className="me-auto toast-header">Discount Smoke</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="toast-body">{text}</Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default MyToast;
