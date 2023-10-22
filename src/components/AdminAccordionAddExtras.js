
import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { NavLink } from "react-router-dom";
import "./styles/SideBarAccordion.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import './styles/AdminAccordion.css'
const AdminAccordionAddExtras = () => {
  const navigate = useNavigate();
const handler=(str)=>{
  navigate(str)
}
  return (
    <Accordion defaultActiveKey="1" className="dark-accordion myAccordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="sidebar-accordion-heading">
        <i className="fa-solid fa-plus me-4"></i>Add Attributes
        </Accordion.Header>
        <Accordion.Body> 
          <div className="row">
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/addExtras/flavor")} className="AccordionBtn">Flavors</Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/addExtras/brand")} className="AccordionBtn">
                Brand
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/addExtras/offer")} className="AccordionBtn">
                Offer
              </Button>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdminAccordionAddExtras;

