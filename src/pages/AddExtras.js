import React, { useEffect,useState } from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import { useFirebase } from "../context/firebase";
import { Formik, Form } from "formik";
import FormikControl from '../formik/FormikControl'
import LoaderDark from "../reusableComponents/LoaderDark";
import './styles/AddExtras.css'
import { BTN_SUCCESS } from "../values/designs";
import CustomModal from "../utils/Modal";
import { BRAND_NAME_SCHEMA, FLAVOR_NAME_SCHEMA } from "../values/ValidationSchemas";
import { CONVERT_TO_PASCAL_CASING } from "../utils/genericFunctions";
import { LIGHT_BLUE, WHITE } from "../values/Colors";
import { ADD_EXTRAS_INTERFACE } from "../values/InterfaceDetails";
import { ADD_EXTRA_BRAND_INITIAL_VALUES, ADD_EXTRA_FLAVOR_INITIAL_VALUES } from "../values/InitialValues";

const AddExtras = () => {
  const firebase = useFirebase();
  const [PreviousFlavors, setPreviousFlavors] = useState([]);
  const [showFlavorALreadyAdded, setshowFlavorALreadyAdded] = useState(false);
  const [showBrandALreadyAdded, setshowBrandALreadyAdded] = useState(false);
  const [PreviousBrands, setPreviousBrands] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [LoaderState, setLoaderState] = useState(false);

const flavorOnSubmit = async (values) => {
  setLoaderState(true);
  let flavor = CONVERT_TO_PASCAL_CASING(values.flavorName);
  if (PreviousFlavors.some((prevFlavor) => prevFlavor.flavorName === flavor)) {
    setshowFlavorALreadyAdded(true);
  } else {
    setshowFlavorALreadyAdded(false);
    await firebase.addNewFlavor(flavor);
    setUpdateFlag((prevFlag) => !prevFlag);
  }
  setLoaderState(false);
};

const brandOnSubmit = async (values) => {
  setLoaderState(true);
  let brand = CONVERT_TO_PASCAL_CASING(values.brandName);
  if (PreviousBrands.some((prevBrand) => prevBrand.brandName === brand)) {
    setshowBrandALreadyAdded(true);
  } else {
    setshowBrandALreadyAdded(false);
    await firebase.addNewBrand(brand);
    // Update the flag to trigger a re-render
    setUpdateFlag((prevFlag) => !prevFlag);
  }
  setLoaderState(false);
};

  const flavorValidationSchema=()=>FLAVOR_NAME_SCHEMA
  const brandValidationSchema=()=>BRAND_NAME_SCHEMA

  const FlavorInitialValues = ADD_EXTRA_FLAVOR_INITIAL_VALUES
  const BrandInitialValues = ADD_EXTRA_BRAND_INITIAL_VALUES
  const interfaceDetails =ADD_EXTRAS_INTERFACE
  
  useEffect(() => {
    const fetch = async () => {
      setPreviousFlavors(await firebase.getFlavors());
      setPreviousBrands(await firebase.getBrands());
    };
    fetch();
  },[updateFlag]);

  return (
    <div style={{ backgroundColor: WHITE }}>
      <MyNavbar status={true} />
      <Title name={`Add Extras`} />
      {showFlavorALreadyAdded && <CustomModal text={"Flavor already added"} timer={3000} imageID={"MSGST"}/>}
      {showBrandALreadyAdded && <CustomModal text={"Brand already added"} timer={3000} imageID={"MSGST"}/>}
      <div className="row m-0">
        <div className="col-4 col-lg-3 d-md-block d-none p-0">
          <SearchBar />
        </div>
       <div className="col-lg-9 col-12 col-md-8 p-0">
          <div className="row m-0 justify-content-center">
            {LoaderState?(<LoaderDark/>):(<div className="col-11">
              <p className="FormLabels">Previously Added Flavors :</p> 
              {PreviousFlavors.map((flavor,index) => (
                <div className="flavorButtons col" key={index}>
                  {flavor.flavorName}
                </div>
              ))}
              <br />
              <Formik initialValues={FlavorInitialValues} validateOnBlur={false} onSubmit={flavorOnSubmit} validationSchema={flavorValidationSchema}>
               {(formik) => {
                return <Form>
                  <FormikControl control="input" type="flavorName" name="flavorName" label="Flavor Name"interfaceDetails={interfaceDetails} />
                  <div style={{textAlign:'center'}}>
                    <button type="submit" style={BTN_SUCCESS}>Add Flavor</button>
                  </div>
                </Form>
               }}
              </Formik>
              <p className="FormLabels">Previously Added Brands :</p> 
              {PreviousBrands.map((brand,index) => (
                <div className="flavorButtons col" key={index}>
                  {brand.brandName}
                </div>
              ))}
              <br />
              <Formik initialValues={BrandInitialValues} validateOnBlur={false} onSubmit={brandOnSubmit} validationSchema={brandValidationSchema}>
               {(formik) => {
                return <Form>
                  <FormikControl control="input" type="brandName" name="brandName" label="Brand Name"interfaceDetails={interfaceDetails} />
                  <div style={{textAlign:'center'}}>
                    <button type="submit" style={BTN_SUCCESS}>Add Brand</button>
                  </div>
                </Form>
               }}
              </Formik>
            </div>)}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default AddExtras;
