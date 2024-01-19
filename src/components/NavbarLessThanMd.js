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
const navigateToPage=(link)=>{
  setShowNavbar(false);
  navigate(link)
}
  return (
    <>
    <Offcanvas show={ShowNavbar} onHide={()=>setShowNavbar(false)} className={`${styles.offcanvas_main} `}>
        <Offcanvas.Header >
          <div className="row w-100 ">
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
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}  onClick={()=>navigateToPage("/home")}> Home</Nav.Link> 
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}  onClick={()=>navigateToPage("/product/cigars")}> Cigars</Nav.Link> 
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}  onClick={()=>navigateToPage("/product/disposableVapes")}> Dispossable Vapes</Nav.Link>            
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}  onClick={()=>navigateToPage("/product/starterDevices")} > Starter devices</Nav.Link> 
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} onClick={()=>navigateToPage("/product/vapeJuice")}> Vape Juice</Nav.Link>
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} > Accessories</Nav.Link>
           <div className="row m-0">
            <div className="col-12 p-0 ps-5">
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/pods")}> Pods</Nav.Link>   
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/coils")}> Coils</Nav.Link>   
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/candlesAndIncense")}> Candles and Incense</Nav.Link>   
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/hookah")} > Hookah </Nav.Link>   
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/hookahFlavors")} > Hookah Flavors </Nav.Link>   
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/cigaretteMachines")} > Cigarette Machines </Nav.Link>   
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/glassCleaners")} > Glass Cleaners </Nav.Link> 
            </div>
           </div>
           <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`} > More</Nav.Link>
        
           <div className="row m-0">
            <div className="col-12 p-0 ps-5">
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/kratom")} > Kratom </Nav.Link>   
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/chewingTobacco")} > Chewing Tobacco </Nav.Link>   
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/rollYourOwn")} > Roll your Own </Nav.Link>   
            <Nav.Link className={`btn-one mb-2 ${styles.navbar_btn}`}   onClick={()=>navigateToPage("/product/cbdGummies")} > CBD Gummies </Nav.Link> 
            </div>
           </div>
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
