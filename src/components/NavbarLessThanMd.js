import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import navbarlogo from "../logoWithoutBackground.png";
import Nav from "react-bootstrap/Nav";
import { toAbsoluteURL } from "../helper/Helper";
import styles from './styles/NavbarLessThanMd.module.css'
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink,useNavigate } from "react-router-dom";
import HrTag from '../reusableComponents/HrTag';
import SearchBar from './SearchBar';
import { WHITE } from '../values/Colors';

const NavbarLessThanMd = () => {
const [ShowNavbar, setShowNavbar] = useState(false);

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
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/home"}>Home</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/cigars"}>Cigars</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/disposableVapes"}>Dispossable Vapes</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/starterDevices"} >Starter devices</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/vapeJuice"}>Vape Juice</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/pods"}>Pods</Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/coils"}> Coils</Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/candlesAndIncense"}>Candles and Incense</Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/hookah"} >Hookah </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/hookahFlavors"} >Hookah Flavors </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/cigaretteMachines"} > Cigarette Machines </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/glassCleaners"} > Glass Cleaners </Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/kratom"} > Kratom </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/chewingTobacco"} > Chewing Tobacco </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/rollYourOwn"} > Roll your Own </Nav.Link>  
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} as={NavLink} to={"/product/cbdGummies"} > CBD Gummies </Nav.Link>
                  
        </Offcanvas.Body>
      </Offcanvas>
    <div className="row py-3">
        <div className="col-6 text-start">
          <img src={toAbsoluteURL(navbarlogo)} className="navbar-logo" />
        </div>
        <div className="col-6 text-end align-self-center">
          <i className={`fa-solid fa-bars ${styles.toggle_icon}`} onClick={()=>setShowNavbar(true)}></i>
        </div>
    </div>
    
    </>
  )
}

export default NavbarLessThanMd
