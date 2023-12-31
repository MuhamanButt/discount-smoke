import React from 'react'
import { useState } from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink,useNavigate } from "react-router-dom";
import navbarlogo from "../logoWithoutBackground.png";
import { toAbsoluteURL } from "../helper/Helper";
import SearchBar from "../components/SearchBar";

const NavbarMd = () => {
  return (
    <Navbar expand="md" data-bs-theme="dark" className="navbar-dark pe-md-5">
              <Navbar.Brand as={NavLink} to="/home">
                <img src={toAbsoluteURL(navbarlogo)} className="navbar-logo" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
              >
                <Nav className="ms-auto">
                  <Nav.Link className="btn-one" as={NavLink} to={"/home"}>Home</Nav.Link>
                  <Nav.Link className="btn-one" as={NavLink} to={"/product/cigars"}>Cigars</Nav.Link>
                  <Nav.Link className="btn-one" as={NavLink} to={"/product/disposableVapes"}>Dispossable Vapes</Nav.Link>
                  {/* <Nav.Link className="btn-one"as={NavLink} to={"/product/cigarettes"}> Cigarettes </Nav.Link> */}
                  <Nav.Link className="btn-one" as={NavLink} to={"/product/starterDevices"} >Starter devices</Nav.Link>
                  <Nav.Link className="btn-one" as={NavLink} to={"/product/vapeJuice"}>Vape Juice</Nav.Link>
                  <NavDropdown title="Accessories" id="basic-nav-dropdown" className="drop-shadow z-1">
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/pods"}>Pods</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/coils"}> Coils</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/candlesAndIncense"}>Candles and Incense</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/hookah"} >Hookah </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/hookahFlavors"} >Hookah Flavors </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/cigaretteMachines"} > Cigarette Machines </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/glassCleaners"} > Glass Cleaners </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="More" id="basic-nav-dropdown" className="drop-shadow z-1 mb-2">
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/kratom"} > Kratom </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/chewingTobacco"} > Chewing Tobacco </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/rollYourOwn"} > Roll your Own </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/cbdGummies"} > CBD Gummies </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <div className="row m-0 d-md-none">
                  <div className="col p-0">
                    <SearchBar inNavbar={true}/>
                  </div>
                </div>
              </Navbar.Collapse>
            </Navbar>
  )
}

export default NavbarMd
