import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { NavLink } from "react-router-dom";
import "./styles/SideBarAccordion.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./styles/AdminAccordion.css";
import { useSelector } from "react-redux";
const AdminAccordionViewInbox = () => {
  const navigate = useNavigate();
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
        <i className="fa-regular fa-message me-4"/>Inbox Messages
        </Accordion.Header>
        <Accordion.Body>
          <div className="row">
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button
                onClick={() => handler("/messages/viewed")}
                className="AccordionBtn"
              >
                Viewed
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button
                onClick={() => handler("/messages/new")}
                className="AccordionBtn position-relative"
              >
                New
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
              </Button>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdminAccordionViewInbox;
