import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import "./styles/MessageComponent.css";
import Modal from "react-bootstrap/Modal";
import ConfirmationModal from "../utils/ConfirmationModal";
import { CONVERT_TIMESTAMP_TO_DATE_TIME } from "../utils/genericFunctions";
import MessageInfoModal from "../reusableComponents/MessageInfoModal";

const AdminAccordionMessageComponent = ({ data, index}) => {
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
    {showDeleteModal&&<ConfirmationModal query={"Are you sure you want to delete this Message?"} confirmationOption={"Delete"} onConfirmHandler={deleteMessage}/>}
    {showMarkModal&&<ConfirmationModal query={`Mark Message As ${data.Status == "new" ? "viewed" : "new"}`} confirmationOption={`Mark As ${data.Status == "new" ? "viewed" : "new"}`} onConfirmHandler={statusHandler}/>}
      
      <Modal show={show} onHide={handleClose} size="xl" centered backdrop={true}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row" id={`message-${data.id}`} key={`message-${data.id}`}>
            <MessageInfoModal title={"ID"} value={data.id} col={12}/>
            <MessageInfoModal title={"Date"} value={CONVERT_TIMESTAMP_TO_DATE_TIME(data.TimeStamp)} col={6}/>
            <MessageInfoModal title={"Name"} value={data.Name} col={6}/>
            <MessageInfoModal title={"Contact No"} value={data.ContactNo} col={6}/>
            <MessageInfoModal title={"Email"} value={data.Email} col={6}/>
            <MessageInfoModal title={"Description"} value={getDescription()} col={12}/>
          </div>
        </Modal.Body>
      </Modal>
      <tr id={`message-${data.id}`}>
        <td className=" contactUs-font">{index + 1}</td>
        <td className=" contactUs-font text-start" colSpan="2">{data.Description.slice(0, 100)}...</td>
        <td className=" contactUs-font text-start">{data.Email.slice(0, 15)}...</td>
        <td className="p-1 text-center">
          <i className="fa-solid me-2 fa-marker contactUs-font" onClick={markMessage}/>
          <i className="fa-solid me-2 fa-eye contactUs-font" onClick={showModal}/>
          <i className="fa-solid me-2 fa-trash contactUs-font" onClick={showDelete}/>
        </td>
      </tr>
    </>
  );
};

export default AdminAccordionMessageComponent;
