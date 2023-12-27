import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DANGER, WHITE } from "../values/Colors";

const ConfirmationModal = ({query,confirmationOption,onConfirmHandler}) => {
    const [showModal, setshowModal] = useState(true);
  return (
    <Modal show={showModal} onHide={()=>setshowModal(false)}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: DANGER, color: WHITE }}
      >
        <Modal.Title>{confirmationOption}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "600" }}>
        {query}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>setshowModal(false)}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={onConfirmHandler}
          style={{ backgroundColor: DANGER }}
        >
          {confirmationOption}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
