import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { NavLink } from "react-router-dom";
import "./styles/SideBarAccordion.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import './styles/AdminAccordion.css'
const AdminAccordionAdd = () => {
  const navigate = useNavigate();
const handler=(str)=>{
  navigate(str)
}
  return (
    <Accordion defaultActiveKey="1" className="dark-accordion myAccordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="sidebar-accordion-heading">
        <i className="fa-solid fa-cart-shopping me-4"></i> Add Product
        </Accordion.Header>
        <Accordion.Body>
          <div className="row">
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/coils")} className="AccordionBtn">Coils</Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/cbdGummies")} className="AccordionBtn">
                CBD Gummies
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/candlesAndIncense")} className="AccordionBtn">
                Candles and Incense
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/cigarettes")} className="AccordionBtn">Cigarettes</Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/cigars")} className="AccordionBtn">Cigars</Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/chewingTobacco")} className="AccordionBtn">
                Chewing Tobacco
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/cigaretteMachines")} className="AccordionBtn">
                Cigarette Machines
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/rollYourOwn")} className="AccordionBtn">
                Roll your Own
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/disposableVapes")} className="AccordionBtn">
                Disposable Vapes
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/glassCleaners")} className="AccordionBtn">
                Glass Cleaners
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/hookahFlavors")} className="AccordionBtn">
                Hookah Flavors
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/hookah")} className="AccordionBtn">Hookah</Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/kratom")} className="AccordionBtn">Kratom</Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/pods")} className="AccordionBtn">Pods</Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/starterDevices")} className="AccordionBtn">
                Starter Devices
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4 ">
              <Button onClick={()=>handler("/add/vapeJuice")} className="AccordionBtn">Vape Juice</Button>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdminAccordionAdd;
