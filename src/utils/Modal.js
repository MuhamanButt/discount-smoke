import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CSSTransition } from "react-transition-group";
import styles from "./styles/Modal.module.css";
import errorImage from "./assets/error.svg";
import messageSent from './assets/messageSent.svg'
const CustomModal = ({ text, timer,imageID }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    
    setTimeout(() => {
    setShow(false)
  }, timer);
  }, []);

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="my-toast"
      unmountOnExit
      onExited={() => setShow(false)}
    >
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        style={{ filter: "drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.5))" }}
        className={styles.practice}
      >
        <div className="row">
          <div className="col-12 text-center">
            <Modal.Body>
              <img src={imageID=="MSGST"?messageSent:imageID=="ERR"?errorImage:''} alt="error" style={{ height: "200px" }} />
            </Modal.Body>
          </div>
        </div>
        <Modal.Body style={{ fontWeight: "600", textAlign: "center" }}>
          {text}
        </Modal.Body>
        <div className="row m-3">
          <div className="col-12 text-center">
            <Button variant="danger" onClick={() => setShow(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </CSSTransition>
  );
};

export default CustomModal;
