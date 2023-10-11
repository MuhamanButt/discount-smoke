import React, { useEffect } from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import MyButton from "../reusableComponents/MyButton";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useFirebase } from "../context/firebase";
import './styles/AddExtras.css'

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Loader from "../reusableComponents/Loader";
import LoaderDark from "../reusableComponents/LoaderDark";

const AddExtras = () => {
  const firebase = useFirebase();
  const [show, setShow] = useState(false);
  const [Flavor, setFlavor] = useState("Enter Flavor Name...");
  const [PreviousFlavors, setPreviousFlavors] = useState([]);
  const [Brand, setBrand] = useState("Enter Brand Name...");
  const [PreviousBrands, setPreviousBrands] = useState([]);
  const [LoaderState, setLoaderState] = useState(false);
  const [reRender, setreRender] = useState(false);
  const BrandSubmitHandler = async () => {
    setLoaderState(true)
    let brand=capitalizeWords(Brand);
    if (PreviousBrands.some((prevBrand) => prevBrand.brandName === brand)) {
      setShow(true);
      setLoaderState(false)
    } else {
      await firebase.addNewBrand(brand);
      setreRender(!reRender)
      setLoaderState(false)
    }
  };
  const FlavorSubmitHandler = async () => {
    setLoaderState(true)
    let flavor=capitalizeWords(Flavor);
    if (
      PreviousFlavors.some((prevFlavor) => prevFlavor.flavorName === flavor)
    ) {
      setShow(true);
      setLoaderState(false)
    } else {
      await firebase.addNewFlavor(flavor);
      setreRender(!reRender)
      setLoaderState(false)
    }
  };

  const capitalizeWords=(inputString)=> {
    const words = inputString.split(" ");
    const capitalizedWords = words.map((word) => {if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
  }});
    return capitalizedWords.join(" ");
  }
  
  useEffect(() => {
    const fetch = async () => {
      setPreviousFlavors(await firebase.getFlavors());
      setPreviousBrands(await firebase.getBrands());
    };
    fetch();
  },[reRender]);
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true} />
      <Title name={`Add Extras`} />
      <div className="row m-0">
          <div className="mb-2 col-md-6">
            <ToastContainer
              position="top-end"
              className="p-3"
              style={{ zIndex: 1 }}
            >
               <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Discount Smoke</strong>
                  <small>Just now</small>
                </Toast.Header>
                <Toast.Body>Already Added!!</Toast.Body>
              </Toast>
            </ToastContainer>
          </div>
        </div>
      <div className="row m-0">
        <div className="col-4 col-lg-3 d-md-block d-none p-0">
          <SearchBar />
        </div>
       <div className="col-lg-9 col-12 col-md-8 p-0">
          <div className="row m-0 justify-content-center">
            {LoaderState?(<LoaderDark></LoaderDark>):(<div className="col-11">
              <p className="FormLabels">Previously Added Flavors :</p> 
              {PreviousFlavors.map((flavor,index) => (
                <div className="flavorButtons col" key={index}>
                  {flavor.flavorName}
                </div>
              ))}
              <br />
              <Form>
                <Form.Group className="my-3">
                  <Form.Label className="FormLabels">Flavor Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={Flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                  />
                </Form.Group>
                <div className="row justify-content-center">
                  <div className="col text-center mb-5">
                    <MyButton
                      text={"Add Flavor"}
                      handler={FlavorSubmitHandler}
                      color={"#00bc00"}
                    ></MyButton>
                  </div>
                </div>

                <p className="FormLabels">Previously Added Brands :</p> 
              {PreviousBrands.map((brand,index) => (
                <div className="flavorButtons col" key={index}>
                  {brand.brandName}
                </div>
              ))}
              <br />
                <Form.Group className="my-3">
                  <Form.Label className="FormLabels">Brand Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={Brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Form.Group>
                <div className="row justify-content-center">
                  <div className="col text-center mb-5">
                    <MyButton
                      text={"Add Brand"}
                      handler={BrandSubmitHandler}
                      color={"#00bc00"}
                    ></MyButton>
                  </div>
                </div>
              </Form>
            </div>)}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default AddExtras;
