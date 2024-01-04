import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import navbarlogo from "../assets/logoWithoutBackground.webp";
import Nav from "react-bootstrap/Nav";
import { toAbsoluteURL } from "../helper/Helper";
import styles from './styles/NavbarLessThanMd.module.css'
import { NavLink } from "react-router-dom";
import SearchBar from './SearchBar';
import { WHITE } from '../values/Colors';
import { useNavigate } from 'react-router-dom';

const NavbarLessThanMd = () => {
const [ShowNavbar, setShowNavbar] = useState(false);
const navigate=useNavigate();

  return (
    <>
    <Offcanvas show={ShowNavbar} onHide={()=>setShowNavbar(false)} className={`${styles.offcanvas_main}`}>
        <Offcanvas.Header >
          <div className="row w-100">
            <div className="col-8 text-start">
            <img src={toAbsoluteURL(navbarlogo)} className="navbar-logo" />
            </div>
            <div className="col-4 text-end align-self-center">
             <i className='fa-solid fa-arrow-left' style={{color:WHITE}} onClick={()=>setShowNavbar(false)}/>
            </div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className={`${styles.offcanvas_body}`}>
        <SearchBar inNavbar={true}/>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/home"}><i className="fa-solid fa-angle-right me-4"/>Home</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/cigars"}><i className="fa-solid fa-angle-right me-4"/>Cigars</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/disposableVapes"}><i className="fa-solid fa-angle-right me-4"/>Dispossable Vapes</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/starterDevices"} ><i className="fa-solid fa-angle-right me-4"/>Starter devices</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/vapeJuice"}><i className="fa-solid fa-angle-right me-4"/>Vape Juice</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/pods"}><i className="fa-solid fa-angle-right me-4"/>Pods</Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/coils"}><i className="fa-solid fa-angle-right me-4"/>Coils</Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/candlesAndIncense"}><i className="fa-solid fa-angle-right me-4"/>Candles and Incense</Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/hookah"} ><i className="fa-solid fa-angle-right me-4"/>Hookah </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/hookahFlavors"} ><i className="fa-solid fa-angle-right me-4"/>Hookah Flavors </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/cigaretteMachines"} ><i className="fa-solid fa-angle-right me-4"/>Cigarette Machines </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/glassCleaners"} ><i className="fa-solid fa-angle-right me-4"/>Glass Cleaners </Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/kratom"} ><i className="fa-solid fa-angle-right me-4"/>Kratom </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/chewingTobacco"} ><i className="fa-solid fa-angle-right me-4"/>Chewing Tobacco </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/rollYourOwn"} ><i className="fa-solid fa-angle-right me-4"/>Roll your Own </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/cbdGummies"} ><i className="fa-solid fa-angle-right me-4"/>CBD Gummies </Nav.Link>
                  
        </Offcanvas.Body>
      </Offcanvas>
      <div className="row py-3 text-center">
      <div className="col-1 text-start align-self-center">
        <i
          className={`fa-solid fa-bars ${styles.toggle_icon}`}
          onClick={() => setShowNavbar(true)}
        ></i>
      </div>
      <div className="col-10 text-center">
        <img
          src={toAbsoluteURL(navbarlogo)}
          className={`${styles.navbarLogo} align-self-center`}
          onClick={() => navigate("/home")}
        />
      </div>
      <div className="col-1 text-start align-self-center">
        <i
          className={`fa-solid fa-bag-shopping ${styles.toggle_icon}`}
          onClick={() => navigate("/product/all")}
        ></i>
      </div>
    </div>
    
    </>
  )
}

export default NavbarLessThanMd
