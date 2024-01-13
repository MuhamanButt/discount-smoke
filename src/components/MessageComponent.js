import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import "./styles/MessageComponent.css";
import Modal from "react-bootstrap/Modal";
import MessageInfoModal from "../reusableComponents/MessageInfoModal";
import { CONVERT_TIMESTAMP_TO_DATE_TIME } from "../utils/genericFunctions";
import ConfirmationModal from "../utils/ConfirmationModal";
import { Button, Popconfirm, ConfigProvider } from 'antd';
import { ExclamationCircleTwoTone } from "@ant-design/icons";

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

  
  const deleteMessage = async () => {
    handleCloseDeleteModal();
    await firebase.deleteMessageByIdentity(data.id);
    document.getElementById(`message-${data.id}`).classList.add("d-none");
  };
  const markMessage = async () => {
    handleShowMarkModal();
  };
  return (
    <span className="message-component">
        <p ><strong>Identity : </strong>{data.id}</p>
        <p ><strong>Name : </strong>{data.Name}</p>
        <p ><strong>ContactNo : </strong>{data.ContactNo}</p>
        <p ><strong>Email : </strong>{data.Email}</p>
        <p ><strong>TimeStamp : </strong>{data.TimeStamp}</p>
        <p ><strong>Description : </strong>{data.Description}</p>
        <Popconfirm
          placement="topRight"
          title={"Are you sure you want to delete this Message?"}
          okText="Delete"
          cancelText="Cancel"
          onConfirm={deleteMessage}
          icon={<ExclamationCircleTwoTone  twoToneColor="#ff0000" />}>
          <Button danger><i className="fa-solid me-2 fa-trash"/> Delete Message</Button>
        </Popconfirm>
    </span>
  );
};

export default MessageComponent;
