
import React from "react";
import { Button,Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import "./styles/SideBarAccordion.css";
import './styles/AdminAccordion.css'
const AdminAccordionDownload = () => {
    const firebase=useFirebase();
  const navigate = useNavigate();
const handler=(str)=>{
  navigate(str)
}
const downloadProductDataHandler = async () => {
  await firebase.downloadAllDataToExcel();
};
const downloadOfferDataHandler = async () => {
  await firebase.downloadAllOffersToExcel();
};
const downloadMessagesDataHandler = async () => {
  await firebase.downloadAllMessagesToExcel();
};
  return (
    <Accordion defaultActiveKey="1" className="dark-accordion myAccordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="sidebar-accordion-heading">
        <i className="fa-solid fa-download me-4"></i>Download Data
        </Accordion.Header>
        <Accordion.Body> 
          <div className="row">
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={downloadProductDataHandler} className="AccordionBtn">
                Products
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={downloadOfferDataHandler} className="AccordionBtn">
                Offers
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={downloadMessagesDataHandler} className="AccordionBtn">
                Messages
              </Button>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdminAccordionDownload;

