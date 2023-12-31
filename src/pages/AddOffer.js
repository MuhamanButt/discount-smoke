import React,{ useState, useEffect } from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import Footer from "../reusableComponents/Footer";
import SearchBar from "../components/SearchBar";
import "../components/styles/Form.css";
import { useFirebase } from "../context/firebase";
import { Formik, Form } from "formik";
import styles from './styles/AddProduct.module.css'
import CustomModal from "../utils/Modal";
import FormikControl from '../formik/FormikControl'
import Loader from "../reusableComponents/Loader";
import 'react-quill/dist/quill.snow.css';
import { CONVERT_HOURS_DAYS_TO_TIMESTAMP } from "../utils/genericFunctions";
import { ADD_UPDATE_PRODUCT_INTERFACE } from "../values/InterfaceDetails";
import { ADD_OFFER_INITIAL_VALUES } from "../values/InitialValues";
import { ADD_OFFER_SCHEMA } from "../values/ValidationSchemas";
const AddOffer = () => {

  const firebase = useFirebase();
  const [Loading, setLoading] = useState(true);
  const [Flavors, setFlavors] = useState(null);
  const [Brands, setBrands] = useState(null);
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);
  const onSubmit=async({offerDescription,remainingDays,remainingHours,productName,description,features,selectedFlavors,selectedBrand,image})=>{
    setLoading(true);
    const ExpirationTime = CONVERT_HOURS_DAYS_TO_TIMESTAMP(remainingHours, remainingDays)
    if(await firebase.addNewOffer( productName, description, features, selectedBrand, selectedFlavors,offerDescription,ExpirationTime, image)){
      setshowSuccessModal(false)
      setshowSuccessModal(true)
    }
    else{
      showErrorModal(false)
      showErrorModal(true)
    }
    setLoading(false);
  }
  
  useEffect(() => {
    const fetch = async () => {
      if(!(Flavors&&Brands)) {
        setFlavors(await firebase.getFlavors());
      setBrands(await firebase.getBrands());
      }
      setLoading(false)
    };
    fetch();
  }, [Flavors,Brands]);
  const interfaceDetails=ADD_UPDATE_PRODUCT_INTERFACE
  const initialValues=ADD_OFFER_INITIAL_VALUES
  const validationSchema=()=>ADD_OFFER_SCHEMA
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true} />
      {showErrorModal&&<CustomModal text="There is an error adding offer Please try again" timer={2000} imageID={"ERR"}/>}
      {showSuccessModal&&<CustomModal text="Offer added successfully" timer={2000} imageID={"MSGST"}/>}
      <Title name={`Add New Offer`} />
      <div className="row m-0">
        <div className="col-4 col-lg-3 d-md-block d-none">
          <SearchBar />
        </div>
        <div className="col-lg-9 col-12 col-md-8">
          <div className="row m-0 justify-content-center">
          {Loading?<Loader/>:
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            onSubmit={onSubmit}
          >
            {(formik)=>{
              return <Form>
                 <FormikControl control="input" type="offerDescription" name="offerDescription" label="Offer Description" interfaceDetails={interfaceDetails} totalCharacters={100}/>
                 <FormikControl control="input" type="remainingDays" name="remainingDays" label="Remaining Days" interfaceDetails={interfaceDetails}/>
                 <FormikControl control="input" type="remainingHours" name="remainingHours" label="Remaining Hours" interfaceDetails={interfaceDetails}/>
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
      <Footer/>
    </div>
  );
};

export default AddOffer;
