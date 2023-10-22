import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState } from "react";
import "./styles/Toast.css";
const MyToast = ({ text, showHandler }) => {
  const [Show, setShow] = useState(showHandler);

  useEffect(() => {
    setShow(showHandler)
  }, [showHandler]);
  return (
    <div className="row">
      <div className="mb-2 col-md-6">
        <ToastContainer
          position="top-end"
          className="p-3"
          style={{ zIndex: 200, position: "fixed" }}
        >
          <Toast
            onClose={() => setShow(false)}
            show={Show}
            delay={2000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Discount Smoke</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
};

export default MyToast;
