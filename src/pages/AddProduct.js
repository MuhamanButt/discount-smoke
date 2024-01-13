

import React from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import { Formik, Form } from "formik";
import { useEffect } from "react";
import styles from './styles/AddProduct.module.css'
import { useState } from "react";
import FormikControl from '../formik/FormikControl'
import { ADD_PRODUCT_SCHEMA } from "../values/ValidationSchemas";
import Loader from "../reusableComponents/Loader";
import { useFirebase } from "../context/firebase";
import CustomModal from "../utils/Modal";
import { ADD_PRODUCT_INITIAL_VALUES } from "../values/InitialValues";
import { ADD_PRODUCT_INTERFACE, ADD_UPDATE_PRODUCT_INTERFACE } from "../values/InterfaceDetails";
import FormShimmer from "../shimmers/FormShimmer";
import { SUPER_WHITE, WHITE } from "../values/Colors";

const AddProduct = ({category}) => {
  const firebase=useFirebase();
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Flavors, setFlavors] = useState(null);
  const [Brands, setBrands] = useState(null);
  const onSubmit = async ({productName,description,features,selectedFlavors,selectedBrand,image}) => {
    console.log(selectedBrand)
    setLoading(true);
    if(await firebase.addNewProduct( productName, description, features, selectedBrand, selectedFlavors, image, category))
    {
      setshowSuccessModal(false)
      setshowSuccessModal(true)
    }
    else
    {
      showErrorModal(false)
      showErrorModal(true)
    }
    setLoading(false);
  }
  useEffect(() => {
    const fetch = async () => {
      if(!(Flavors&&Brands))
      {
        setFlavors(await firebase.getFlavors());
        setBrands(await firebase.getBrands());
      }
      setLoading(false)
    };
    fetch();
  }, [Flavors,Brands]);
  const interfaceDetails = ADD_UPDATE_PRODUCT_INTERFACE
  const initialValues = ADD_PRODUCT_INITIAL_VALUES
  const validationSchema = () => ADD_PRODUCT_SCHEMA
  return (
    <div style={{ backgroundColor:SUPER_WHITE }}>
    <MyNavbar status={true}/>
    {showErrorModal&&<CustomModal text="There is an error adding product Please try again" timer={2000} imageID={"ERR"}/>}
    {showSuccessModal&&<CustomModal text="Product added successfully" timer={2000} imageID={"MSGST"}/>}
    <Title name={`Add Product (${category})`}/>
    <div className="row m-0">
      <div className="col-4 col-lg-3 d-md-block d-none">
        <SearchBar/>
      </div>
      <div className="col-lg-9 col-12 col-md-8">
        <div className="row m-0 justify-content-center">
          <div className="col-11">
          {Loading?<FormShimmer/>:
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            onSubmit={onSubmit}
          >
            {(formik)=>{
              return <Form>
                 <FormikControl control="input" type="productName" name="productName" label="Product Name" interfaceDetails={interfaceDetails} totalCharacters={50}/>
                 <FormikControl control="textarea" type="description" name="description" label="Description" interfaceDetails={interfaceDetails} totalCharacters={300} height={"200px"}/>
                 <FormikControl control="quill" type="features" name="features" label="Features" interfaceDetails={interfaceDetails} height={"200px"}/>
                 <FormikControl control="dropdown" type="selectedFlavors" name="selectedFlavors" label="Select Flavors" interfaceDetails={interfaceDetails} arrayOfAvailableOptions={Flavors}/>
                 <FormikControl control="dropdown" type="selectedBrand" name="selectedBrand" label="Select Brand" interfaceDetails={interfaceDetails} arrayOfAvailableOptions={Brands} allowSingleOption={true}/>
                 <FormikControl control="image" type="image" name="image" label="Image" interfaceDetails={interfaceDetails} height={"200px"} formik={formik}/>
                 <div className="row justify-content-center">
                    <div className="col-12 col-md-6 mb-4 text-center">
                      <button type="submit" className={styles.add_product_btn} disabled={formik.isSubmitting}>Add Product</button>
                    </div>
                  </div>
              </Form>
            }}
          </Formik>}
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
  )
}

export default AddProduct

