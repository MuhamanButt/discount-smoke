import React, { useEffect } from "react";
import "./styles/Footer.css";
import logo from "./assets/logoVerticalWithoutBackground.png";
import { NavLink } from "react-router-dom";
import { toAbsoluteURL } from "../helper/Helper";
import { DropdownDivider } from "react-bootstrap";
const Footer = () => {
  return (
    <div className="row footer-main m-0 py-4">
      <div className="col p-0 py-3 py-lg-2">
        <div className="row justify-content-center m-0">
          <div className="col-12 col-md-2 align-self-center text-center">
            <img src={toAbsoluteURL(logo)} alt="" className="footer-logo" />
          </div>
          <div className="col-12 col-md-3 col-md-3 footer-details align-self-center">
            <p>436 Rubber Ave Naugatuck, CT 06770</p>
            <br />
            <p>
              <i className="fa-solid fa-phone"/>203-723-5000
            </p>
            <p>
              <i className="fa-solid fa-envelope"/>dsmoke436@gmail.com
            </p>
            <p>
              <i className="fa-regular fa-clock"/>Mon - Sun (9AM to 9PM)
            </p>
          </div>
          <div className="col-9 col-sm-4 col-md-3 footer-links align-self-center mt-md-0 mt-4">
            <NavLink to={"/home"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Home</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
            <NavLink to={"/aboutUs"}>
              <p><i className="fa-solid fa-angle-right me-4"/>About Us</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
            <NavLink to={"/product/cigars"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Premium Cigars</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
            <NavLink to={"/product/disposableVapes"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Disposable Vapes</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
            <NavLink to={"/product/cigarettes"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Cigarettes</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
            <NavLink to={"/product/hookah"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Hookah</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
          </div>

          <div className="col-9 col-sm-4 col-md-3 footer-links align-self-center mt-md-0 mt-4">
            <NavLink to={"/product/starterDevices"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Starter Devices</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
            <NavLink to={"/product/vapeJuice"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Vape Juice</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
            <NavLink to={"/product/pods"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Pods</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
            <NavLink to={"/product/coils"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Coils</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
            <NavLink to={"/product/kratom"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Kratom</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
            <NavLink to={"/product/hookahFlavors"}>
              <p><i className="fa-solid fa-angle-right me-4"/>Hookah Flavors</p>
            <hr style={{color:"white",margin:'5px 0px'}}/>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
