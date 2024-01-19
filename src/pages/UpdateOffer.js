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
import { ADD_OFFER_SCHEMA } from "../values/ValidationSchemas";
import FormShimmer from "../shimmers/FormShimmer";
import { Button, message } from 'antd';
import { DatePicker } from "antd";
const UpdateOffer = () => {
  const productInfo = useSelector((state) => state.productInfo.productInfo);
  const firebase = useFirebase();
  const navigate=useNavigate();
  const [LoaderState, setLoaderState] = useState(false);
  const [Flavors, setFlavors] = useState(null);
  const [Brands, setBrands] = useState(null);
  const [flavorsAddedFirstTime, setflavorsAddedFirstTime] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [Timestamp, setTimestamp] = useState(Date.now());
  
  const [initialValues, setInitialValues] = useState(UPDATE_OFFER_INITIAL_VALUES);
  useEffect(() => {
    const fetch = async () => {
      setInitialValues({
        productName: productInfo.ProductName,
        description: productInfo.Description,
        features: productInfo.Features,
        selectedBrand: productInfo.selectedBrand,
        selectedFlavors: Array.isArray(productInfo.selectedFlavors) ? productInfo.selectedFlavors : [],
        Timestamp:productInfo.ExpirationTime,
        offerDescription: productInfo.OfferDescription,
        offerId: productInfo.identity,
        image: '',
      });
      setTimestamp(productInfo.ExpirationTime)
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
  const onSubmit=async({offerDescription,productName,description,features,selectedFlavors,selectedBrand,image,offerId})=>{
    console.log("submitted")
    setLoaderState(true);
    if(await firebase.updateOffer(productName,description,features,selectedBrand,selectedFlavors,offerDescription,Timestamp,offerId,image))
    {
      messageApi.open({type: 'success',content: 'Offer updated successfully...',duration: 2,});
      setLoaderState(false);
    }
    else{
      messageApi.open({type: 'error',content: 'Error : There is an error updating offer Please try again...',duration: 4,});
    }
    setLoaderState(false);
  }
  const onChange = (date, dateString) => {
    const selectedDate = date?.toDate();
    const timestamp = selectedDate.getTime();
    setTimestamp(timestamp)
  };
  const interfaceDetails=ADD_UPDATE_PRODUCT_INTERFACE
  const validationSchema=()=>ADD_OFFER_SCHEMA
  return (
    <div style={{ backgroundColor: "white" }}>
      <MyNavbar status={true} />
      <Title name={`Update Offer`} />
      <div className="row m-0">
        <div className="col-4 col-lg-3 d-md-block d-none"><SearchBar />{contextHolder}</div>
        <div className="col-lg-9 col-12 col-md-8">
          <div className="row m-0 justify-content-center">
            <div className="col-11">
            {LoaderState?<FormShimmer/>:
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            onSubmit={onSubmit}
            enableReinitialize
            >
            {(formik)=>{
              return <Form>
                 <FormikControl control="input" type="offerDescription" name="offerDescription" label="Offer Description" interfaceDetails={interfaceDetails} totalCharacters={100}/>
                 <DatePicker onChange={onChange} showTime format="YYYY-MM-DD HH:mm"/>
                 <FormikControl control="input" type="productName" name="productName" label="Product Name" interfaceDetails={interfaceDetails} totalCharacters={50}/> 
                 <FormikControl control="textarea" type="description" name="description" label="Description" interfaceDetails={interfaceDetails} totalCharacters={300} height={"200px"}/> 
                 <FormikControl control="quill" type="features" name="features" label="Features" interfaceDetails={interfaceDetails} height={"200px"}/> 
                 <FormikControl control="dropdown" type="selectedFlavors" name="selectedFlavors" label="Select Flavors" interfaceDetails={interfaceDetails} arrayOfAvailableOptions={Flavors}/>
                 <FormikControl control="dropdown" type="selectedBrand" name="selectedBrand" label="Select Brand" interfaceDetails={interfaceDetails} arrayOfAvailableOptions={Brands} allowSingleOption={true}/>
                 <FormikControl control="image" type="image" name="image" label="Image" interfaceDetails={interfaceDetails} height={"200px"} formik={formik} notRequired={true}/>
                 <div className="row justify-content-center">
                    <div className="col-12 col-md-6 mb-4 text-center">
                      <button type="submit" className={styles.add_product_btn} disabled={formik.isSubmitting}>Update Offer</button>
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
