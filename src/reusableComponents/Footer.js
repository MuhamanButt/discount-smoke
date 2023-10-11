import React, { useEffect } from "react";
import "./styles/Footer.css";
import logo from "./assets/logoVerticalWithoutBackground.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  return (
    <div className="row footer-main m-0 ">
      <div className="col p-0 py-3 py-lg-2">
        <div className="row justify-content-center m-0">
          <div className="col-12 col-sm-2 align-self-center text-center">
            <img src={logo} alt="" className="footer-logo" />
          </div>
          <div className="col-12 col-sm-3 col-md-3 footer-details align-self-center">
            <p>436 Rubber Ave Naugatuck, CT 06770</p>
            <br />
            <p>
              <i className="fa-solid fa-phone"></i>203-723-5000
            </p>
            <p>
              <i className="fa-solid fa-envelope"></i>dsmoke436@gmail.com
            </p>
            <p>
              <i className="fa-regular fa-clock"></i>Mon - Sun (9AM to 9PM)
            </p>
          </div>
          <div className="col-4 col-sm-3 footer-links align-self-center mt-sm-0 mt-4">
            <NavLink to={"/home"}>
              <p>Home</p>
            </NavLink>
            <NavLink to={"/aboutUs"}>
              <p>About Us</p>
            </NavLink>
            <NavLink to={"/product/cigars"}>
              <p>Premium Cigars</p>
            </NavLink>
            <NavLink to={"/product/disposableVapes"}>
              <p>Disposable Vapes</p>
            </NavLink>
            <NavLink to={"/product/cigarettes"}>
              <p>Cigarettes</p>
            </NavLink>
            <NavLink to={"/product/hookah"}>
              <p>Hookah</p>
            </NavLink>
          </div>

          <div className="col-4 col-sm-3 footer-links align-self-center mt-sm-0 mt-4">
            <NavLink to={"/product/starterDevices"}>
              <p>Starter Devices</p>
            </NavLink>
            <NavLink to={"/product/vapeJuice"}>
              <p>Vape Juice</p>
            </NavLink>
            <NavLink to={"/product/pods"}>
              <p>Pods</p>
            </NavLink>
            <NavLink to={"/product/coils"}>
              <p>Coils</p>
            </NavLink>
            <NavLink to={"/product/kratom"}>
              <p>Kratom</p>
            </NavLink>
            <NavLink to={"/product/hookahFlavors"}>
              <p>Hookah Flavors</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
