import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink } from "react-router-dom";
import "./styles/SideBarAccordion.css";
const productData = [
  { path: "/product/candlesAndIncense", name: "Candles and Incense" },
  { path: "/product/cigarettes", name: "Cigarettes" },
  { path: "/product/cigars", name: "Cigars" },
  { path: "/product/chewingTobacco", name: "Chewing Tobacco" },
  { path: "/product/cigaretteMachines", name: "Cigarette Machines" },
  { path: "/product/coils", name: "Coils" },
  { path: "/product/cbdGummies", name: "CBD Gummies" },
  { path: "/product/rollYourOwn", name: "Roll your Own" },
  { path: "/product/disposableVapes", name: "Disposable Vapes" },
  { path: "/product/glassCleaners", name: "Glass Cleaners" },
  { path: "/product/hookahFlavors", name: "Hookah Flavors" },
  { path: "/product/hookah", name: "Hookah" },
  { path: "/product/kratom", name: "Kratom" },
  { path: "/product/pods", name: "Pods" },
  { path: "/product/starterDevices", name: "Starter Devices" },
  { path: "/product/vapeJuice", name: "Vape Juice" },
];

const SideBarAccordion = () => {
  return (
    <div
      className="mb-4"
      style={{ filter: "drop-shadow(0px 0px 5px #1111114c)" }}
      id="SideBarAccordion"
    >
      <Accordion defaultActiveKey="0" className="dark-accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="sidebar-accordion-heading">
          <i className="fa-solid fa-cart-shopping me-4"></i>Our Products
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              {productData.map((product, index) => (
                <ListGroup.Item key={index}>
                  <NavLink to={product.path}>
                    <p className="sidebar-nav-categories">{product.name}</p>
                  </NavLink>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default React.memo(SideBarAccordion);
