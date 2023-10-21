import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { Table, Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import LoaderDark from "../reusableComponents/LoaderDark";
import AdminAccordionMessageComponent from "./AdminAccordionMessageComponent";
import "./styles/AdminAccordion.css";
import "./styles/SideBarAccordion.css";
const AdminAccordionViewInbox = () => {
  const navigate = useNavigate();
  const [showAfterLG, setshowAfterLG] = useState(window.innerWidth >= 992);
  const firebase = useFirebase();
  const [Messages, setMessages] = useState(null);
  const [LoaderState, setLoaderState] = useState(true);
  const [showAfterMD, setshowAfterMD] = useState(window.innerWidth >= 576);
  const [category, setcategory] = useState("New");
  useEffect(() => {
    const fetch = async () => {
      setLoaderState(true);
      let messages = [];
      if (category == "New") {
        messages = await firebase.getNewMessages();
      } else {
        messages = await firebase.getViewedMessages();
      }
      messages.sort((a, b) => b.TimeStamp - a.TimeStamp);
      setMessages(messages);
      setLoaderState(false);
    };
    fetch();
  }, [category]);

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
  const numberOfMessages = useSelector(
    (state) => state.newMessagesAvailable.numOfMessages
  );
  const handler = (str) => {
    navigate(str);
  };
  return (
    <Accordion
      defaultActiveKey="1"
      className="dark-accordion myAccordion position-relative"
    >
      {numberOfMessages != 0 ? (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ zIndex: "20" }}
        >
          {numberOfMessages}
          <span className="visually-hidden">unread messages</span>
        </span>
      ) : (
        ""
      )}
      <Accordion.Item eventKey="0">
        <Accordion.Header className="sidebar-accordion-heading">
          <i className="fa-regular fa-message me-4" />
          Inbox Messages
        </Accordion.Header>
        <Accordion.Body>
          <div className="row">
            <div className="col-12 d-flex flex-row-reverse">
              <a
                onClick={() => handler("/messages/new")}
                className="viewAllButton"
              >
                View All
              </a>
            </div>
          </div>
          <div className="row m-0 justify-content-center">
            <div className="col-12">
              {LoaderState ? (
                <LoaderDark></LoaderDark>
              ) : (
                <Table responsive="lg" hover>
                  <thead>
                    <tr className="message-table-header">
                      <th>#</th>
                      <th colSpan="2">Description</th>
                      <th>Email</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="contactUs-body">
                    {Messages.slice(0, 10).map((message, index) => (
                      <AdminAccordionMessageComponent
                        data={message}
                        key={index}
                        index={index}
                      ></AdminAccordionMessageComponent>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdminAccordionViewInbox;
