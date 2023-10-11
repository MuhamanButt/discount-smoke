import React, { useEffect } from "react";
import Heading from "../reusableComponents/Heading";
import image from "./assets/7.png";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useFirebase } from "../context/firebase";
import "./styles/OurProducts.css";
import { useState } from "react";
import OurProductSubcomponent from "./OurProductSubcomponent";
import OurProductSkeleton from "../skeletons/OurProductSkeleton";
import { Button } from "react-bootstrap";
const OurProducts = () => {
  const firebase = useFirebase();
  const [cigaretteProducts, setcigaretteProducts] = useState(null);
  const [dataToShow, setdataToShow] = useState([]);
  const [cigarProducts, setcigarProducts] = useState(null);
  const [disposableVapeProducts, setdisposableVapeProducts] = useState(null);
  const [starterDevicesProducts, setstarterDevicesProducts] = useState(null);
  const [vapeJuiceProduct, setvapeJuiceProduct] = useState(null);
  const [hookahproduct, sethookahproduct] = useState(null);
  const [selectedProduct, setselectedProduct] = useState("Starter Devices");
  const [LoaderState, setLoaderState] = useState(true);
 
  useEffect(() => {
    

    const fetch=async()=>{
      setLoaderState(true);
      if (selectedProduct === "Starter Devices") {
        setdataToShow( await firebase.getLatest8ProductsByCategory("Starter Devices"));
      } else if (selectedProduct === "Cigarettes") {
        setdataToShow(await firebase.getLatest8ProductsByCategory("Cigarettes"));
      } else if (selectedProduct === "Cigars") {
        setdataToShow(setcigarProducts(await firebase.getLatest8ProductsByCategory("Cigars")));
      } else if (selectedProduct === "Disposable Vapes") {
        setdataToShow( await firebase.getLatest8ProductsByCategory("Disposable Vapes"));
      } else if (selectedProduct === "Vape Juice") {
        setdataToShow(await firebase.getLatest8ProductsByCategory("Vape Juice"));
      } else if (selectedProduct === "Hookah") {
        setdataToShow(sethookahproduct(await firebase.getLatest8ProductsByCategory("Hookah")));
      }
      setLoaderState(false);
    }
    fetch();
  }, [selectedProduct, starterDevicesProducts]);
  const changeHandler = (str) => {
    setselectedProduct(str);
  };
  
  const determineItemsToMap = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 576) {
      return 2;
    } else if (viewportWidth < 768) {
      return 3;
    } else {
      return 4;
    }
  };
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <Heading text={"OUR PRODUCTS"}></Heading>
      <div className="row m-0">
        <div className="col p-0">
          <img src={image} alt="" style={{ width: "100%" }} />
          <div className="row justify-content-center navbar-row m-0 py-2">
            <div className="col-12 col-md-10">
              <Nav
                className="ms-auto our-product-nav"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <button className="nav-btn" onClick={() => changeHandler("Cigarettes")}>
                  Cigarettes
                </button>
                <button className="nav-btn" onClick={() => changeHandler("Cigars")}>
                  Cigars
                </button>
                <button className="nav-btn" onClick={() => changeHandler("Disposable Vapes")}>
                  Disposable Vapes
                </button>
                <button className="nav-btn" onClick={() => changeHandler("Starter Devices")}>
                  Starter Devices
                </button>
                <button className="nav-btn" onClick={() => changeHandler("Vape Juice")}>
                  Vape Juice
                </button>
                <button className="nav-btn" onClick={() => changeHandler("Hookah")}>
                  Hookah
                </button>
              </Nav>
              {LoaderState ? (
                <OurProductSkeleton number={determineItemsToMap()}></OurProductSkeleton>
              ) : ( (dataToShow && dataToShow.length > 0)?(<OurProductSubcomponent
                  dataToShow={dataToShow}
                ></OurProductSubcomponent>):(
                  <div className="row" style={{height:"100px"}}>
                    <div className="col text-center align-self-center">
                      <h1 className="text-danger"><strong>Products Coming Soon...</strong></h1>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
