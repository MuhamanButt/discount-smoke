import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useFirebase } from "../context/firebase";
import "./styles/MessageComponent.css";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const MessageComponent = ({ data, index }) => {
  const [showAfterLG, setshowAfterLG] = useState(window.innerWidth >= 992);
  const [showAfterMD, setshowAfterMD] = useState(window.innerWidth >= 576);

  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMarkModal, setShowMarkModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleCloseMarkModal = () => setShowMarkModal(false);
  const handleShowMarkModal = () => setShowMarkModal(true);

  function timestampToDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    const dateTimeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${year}-${formattedMonth}-${formattedDay} `;

    return dateTimeString;
  }
  const showModal = () => {
    setShow(true);
  };
  const showDelete = () => {
    handleShowDeleteModal(true);
  };
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setshowAfterMD(true);
        if (window.innerWidth >= 1200) {
          setshowAfterLG(true);
        } else {
          setshowAfterLG(false);
        }
      } else {
        setshowAfterMD(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const firebase = useFirebase();
  const getDescription = () => {
    if (data.Description) {
      const Description = data.Description.split("\n");
      return Description.map((word, index) => <p key={index}>{word}</p>);
    }
    return "";
  };

  const statusHandler = async () => {
    if (data.Status === "viewed") {
      firebase.markMessageAsNew(data.id);
      document.getElementById(`message-${data.id}`).classList.add("d-none");
    } else {
      firebase.markMessageAsViewed(data.id);
      document.getElementById(`message-${data.id}`).classList.add("d-none");
    }
    handleCloseMarkModal();
  };
  const deleteMessage = async () => {
    handleCloseDeleteModal();
    await firebase.deleteMessageByIdentity(data.id);
    document.getElementById(`message-${data.id}`).classList.add("d-none");
  };
  const markMessage = async () => {
    handleShowMarkModal();
  };
  return (
    <>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header
          closeButton
          style={{
            background:
              "linear-gradient(151deg, rgba(125,23,23,1) 0%, rgba(225,42,42,1) 100%)",
            color: "white",
          }}
        >
          <Modal.Title>Delete Message</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "600" }}>
          Are you sure you want to delete this Message?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={deleteMessage}
            style={{
              background:
                "linear-gradient(151deg, rgba(125,23,23,1) 0%, rgba(255,75,75,1) 100%)",
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showMarkModal} onHide={handleCloseMarkModal}>
        <Modal.Header
          closeButton
          style={{
            background:
              "linear-gradient(151deg, rgba(125,23,23,1) 0%, rgba(225,42,42,1) 100%)",
            color: "white",
          }}
        >
          <Modal.Title>
            Mark Message As {`${data.Status == "new" ? "viewed" : "new"}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "600" }}>
          Are you sure you want to mark this Message as{" "}
          {`${data.Status == "new" ? "viewed" : "new"}`}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMarkModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={statusHandler}
            style={{
              background:
                "linear-gradient(151deg, rgba(125,23,23,1) 0%, rgba(255,75,75,1) 100%)",
            }}
          >
            Mark As {`${data.Status == "new" ? "viewed" : "new"}`}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        backdrop={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div
            className="row"
            id={`message-${data.id}`}
            key={`message-${data.id}`}
          >
            <div className="col-12 mt-2">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body p-2">
                  <h5 className="card-title">
                    <strong>ID : </strong>
                  </h5>
                  <p className="card-text m-0">{data.id}</p>
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body p-2">
                  <h5 className="card-title">
                    <strong>Date : </strong>
                  </h5>
                  <p className="card-text m-0">
                    {timestampToDateTime(data.TimeStamp)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body p-2">
                  <h5 className="card-title">
                    <strong>Name : </strong>
                  </h5>
                  <p className="card-text m-0">{data.Name}</p>
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body p-2">
                  <h5 className="card-title">
                    <strong>Contact No : </strong>
                  </h5>
                  <p className="card-text m-0">{data.ContactNo}</p>
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body p-2">
                  <h5 className="card-title">
                    <strong>Email : </strong>
                  </h5>
                  <p className="card-text m-0">{data.Email}</p>
                </div>
              </div>
            </div>
            <div className="col-12 mt-2">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body p-2">
                  <h5 className="card-title">
                    <strong>Description : </strong>
                  </h5>
                  <span className="card-text m-0">{getDescription()}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <tr id={`message-${data.id}`}>
        <td className=" contactUs-font">{index + 1}</td>
        
        <td className=" contactUs-font" colSpan="2">
          {data.Description.slice(0, 100)}...
        </td>
        <td className={`${!showAfterLG ? "d-none" : ""} contactUs-font`}>
          {data.Name.slice(0, 15)}...</td>

          <td className=" contactUs-font">
          {data.Email.slice(0, 15)}...
        </td>

        <td className={`${!showAfterLG ? "d-none" : ""} contactUs-font`}>{data.ContactNo}</td>
        <td className={`${!showAfterLG ? "d-none" : ""} contactUs-font`}>
          {timestampToDateTime(data.TimeStamp)}
        </td>
        <td className="p-1 text-center">
          <i
            className="fa-solid me-2 fa-marker contactUs-font"
            onClick={markMessage}
          ></i>
          <i
            className="fa-solid me-2 fa-eye contactUs-font"
            onClick={showModal}
          ></i>
          <i
            className="fa-solid me-2 fa-trash contactUs-font"
            onClick={showDelete}
          ></i>
        </td>
      </tr>
    </>
  );
};

export default MessageComponent;
