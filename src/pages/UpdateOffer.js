import React from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import { useSelector } from "react-redux";
import { useFirebase } from "../context/firebase";
import { useState, useEffect } from "react";
import "../components/styles/Form.css";
import 'react-quill/dist/quill.snow.css';
import CustomModal from "../utils/Modal";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import styles from './styles/AddProduct.module.css'
import { ADD_UPDATE_PRODUCT_INTERFACE } from "../values/InterfaceDetails";
import FormikControl from '../formik/FormikControl'
import Loader from "../reusableComponents/Loader";
import { UPDATE_OFFER_INITIAL_VALUES } from "../values/InitialValues";
const UpdateOffer = () => {
  const productInfo = useSelector((state) => state.productInfo.productInfo);
  const firebase = useFirebase();
  const navigate=useNavigate();
  const [LoaderState, setLoaderState] = useState(false);
  const [Flavors, setFlavors] = useState(null);
  const [Brands, setBrands] = useState(null);
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);
  const [flavorsAddedFirstTime, setflavorsAddedFirstTime] = useState(false);
  function calculateExpiration(hours, days) {
    const hoursInMillis = hours * 60 * 60 * 1000;
    const daysInMillis = days * 24 * 60 * 60 * 1000;
    return Date.now() + hoursInMillis + daysInMillis;
  }
  const calculateRemainingHours = (timestamp) => {
    const timeDifference = timestamp - Date.now();
    return Math.floor(timeDifference / 3600000) - (Math.floor(timeDifference / 86400000) * 24);
  };
  
  const calculateRemainingDays = (timestamp) => {
    const timeDifference = timestamp - Date.now();
    return Math.floor(timeDifference / 86400000);
  };
  
  const calculateRemainingMinutes = (timestamp) => {
    const timeDifference = timestamp - Date.now();
    return Math.floor(timeDifference / 60000) - ((Math.floor(timeDifference / 3600000) * 60));
  };
  
  const [initialValues, setInitialValues] = useState(UPDATE_OFFER_INITIAL_VALUES);
  useEffect(() => {
    const fetch = async () => {
      setInitialValues({
        productName: productInfo.ProductName,
        description: productInfo.Description,
        features: productInfo.Features,
        selectedBrand: productInfo.selectedBrand,
        selectedFlavors: Array.isArray(productInfo.selectedFlavors) ? productInfo.selectedFlavors : [],
        offerDescription: productInfo.OfferDescription,
        RemainingMinutes: calculateRemainingMinutes(productInfo.ExpirationTime),
        RemainingHours: calculateRemainingHours(productInfo.ExpirationTime),
        RemainingDays: calculateRemainingDays(productInfo.ExpirationTime),
        offerId: productInfo.identity,
        image: '',
      });

      setLoaderState(true);

      if (!Brands) {
        const brands = await firebase.getBrands();
        setBrands(brands);
      }

      if (!flavorsAddedFirstTime) {
        const flavors = await firebase.getFlavors();
        setflavorsAddedFirstTime(true);
        setFlavors(flavors);
      }
      setLoaderState(false);
    };

    fetch();
  }, [Brands,Flavors]);
  const onSubmit=async({offerDescription,RemainingHours,RemainingDays,productName,description,features,selectedFlavors,selectedBrand,image,offerId})=>{
    setLoaderState(true);
    const ExpirationTime = calculateExpiration(RemainingHours, RemainingDays);
    if(await firebase.updateOffer(productName,description,features,selectedBrand,selectedFlavors,offerDescription,ExpirationTime,offerId,image))
    {
      setshowSuccessModal(false)
      setshowSuccessModal(true)
      setTimeout(() => {
        navigate(`/home`)
      }, 2000);
      setLoaderState(false);
    }
    else{
      showErrorModal(false)
      showErrorModal(true)
    }
    setLoaderState(false);
  }
  const interfaceDetails=ADD_UPDATE_PRODUCT_INTERFACE
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true} />
      {showErrorModal&&<CustomModal text="There is an error updating product Please try again" timer={2000} imageID={"ERR"}/>}
      {showSuccessModal&&<CustomModal text="Product updated successfully" timer={2000} imageID={"MSGST"}/>}
      <Title name={`Update Offer`} />
      <div className="row m-0">
        <div className="col-4 col-lg-3 d-md-block d-none"><SearchBar /></div>
        <div className="col-lg-9 col-12 col-md-8">
          <div className="row m-0 justify-content-center">
            <div className="col-11">
            {LoaderState?<Loader/>:
            <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {(formik)=>{
              return <Form>
                 <FormikControl control="input" type="offerDescription" name="offerDescription" label="Offer Description" interfaceDetails={interfaceDetails} totalCharacters={100}/>
                 <FormikControl control="input" type="RemainingDays" name="RemainingDays" label="Remaining Days" interfaceDetails={interfaceDetails}/>
                 <FormikControl control="input" type="RemainingHours" name="RemainingHours" label="Remaining Hours" interfaceDetails={interfaceDetails}/>
                 <FormikControl control="input" type="productName" name="productName" label="Product Name" interfaceDetails={interfaceDetails} totalCharacters={50}/> 
                 <FormikControl control="textarea" type="description" name="description" label="Description" interfaceDetails={interfaceDetails} totalCharacters={300} height={"200px"}/> 
                 <FormikControl control="quill" type="features" name="features" label="Features" interfaceDetails={interfaceDetails} height={"200px"}/> 
                 <FormikControl control="dropdown" type="selectedFlavors" name="selectedFlavors" label="Select Flavors" interfaceDetails={interfaceDetails} arrayOfAvailableOptions={Flavors}/>
                 <FormikControl control="dropdown" type="selectedBrand" name="selectedBrand" label="Select Brand" interfaceDetails={interfaceDetails} arrayOfAvailableOptions={Brands} allowSingleOption={true}/>
                 <FormikControl control="image" type="image" name="image" label="Image" interfaceDetails={interfaceDetails} height={"200px"} formik={formik}/>
                 <div className="row justify-content-center">
                    <div className="col-12 col-md-6 mb-4 text-center">
                      <button type="submit" className={styles.add_product_btn} disabled={formik.isSubmitting}>Add Offer</button>
                    </div>
                  </div>
              </Form>
            }}
          </Formik>}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UpdateOffer;
