import React,{ useState, useEffect } from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import { useFirebase } from "../context/firebase";
import { Formik, Form } from "formik";
import "../components/styles/Form.css";
import { useParams } from "react-router-dom";
import FormikControl from '../formik/FormikControl'
import CustomModal from "../utils/Modal";
import styles from './styles/AddProduct.module.css'
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import FormPageSkeleton from "../skeletons/FormPageSkeleton";
import { ADD_UPDATE_PRODUCT_INTERFACE } from "../values/InterfaceDetails";
const UpdateProduct = () => {
  const navigate=useNavigate()
  const { productID, category } = useParams();
  const firebase = useFirebase();
  const [Product, setProduct] = useState({});
  const [LoaderState, setLoaderState] = useState(false);
  const [Flavors, setFlavors] = useState(null);
  const [Brands, setBrands] = useState(null);
  const [flavorsAddedFirstTime, setflavorsAddedFirstTime] = useState(false);
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);
  const [initialValues, setInitialValues] = useState({
    productName: '',
    description: '',
    features: '',
    selectedFlavors: [],
    selectedBrand: '',
    image: '',
    productID: '',
    category: ''
  });

  const interfaceDetails = ADD_UPDATE_PRODUCT_INTERFACE
  const onSubmit=async({productName,description,features,selectedFlavors,selectedBrand,image,productID,category})=>{
    setLoaderState(true);
    if(await firebase.updateProduct( productName, description, features, selectedBrand, selectedFlavors,category,productID, image )){
      setshowSuccessModal(false)
      setshowSuccessModal(true)
      setTimeout(() => {
        navigate(`/product/view/${productID}`)
      }, 2000);
      setLoaderState(false);
    }
    else{
      showErrorModal(false)
      showErrorModal(true)
    }
    setLoaderState(false);
  }
  useEffect(() => {
  const fetch = async () => {
    setLoaderState(true);
    const data = await firebase.getProductByIdentity(productID, category);
    setProduct(data);
    setInitialValues({
      productName: data.ProductName || '',
      description: data.Description || '',
      features: data.Features || '',
      selectedFlavors: Array.isArray(data.selectedFlavors) ? data.selectedFlavors : [],
      selectedBrand: data.selectedBrand || '',
      image: '',
      productID: productID,
      category: category
    });
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
}, []);
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true} />
      {showErrorModal&&<CustomModal text="There is an error updating product Please try again" timer={2000} imageID={"ERR"}/>}
      {showSuccessModal&&<CustomModal text="Product updated successfully" timer={2000} imageID={"MSGST"}/>}
      <Title name={`Update`} />
      <div className="row m-0">
        <div className="col-4 col-lg-3 d-md-block d-none">
          <SearchBar />
        </div>
        <div className="col-lg-9 col-12 col-md-8">
          <div className="row m-0 justify-content-center">
            <div className="col-11">
              {LoaderState ? (
                <FormPageSkeleton/>
              ) : (
                <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            enableReinitialize
            onSubmit={onSubmit}
          >
            {(formik)=>{
              return <Form>
                 <FormikControl control="input" type="productName" name="productName" label="Product Name" interfaceDetails={interfaceDetails} totalCharacters={50}/>
                 <FormikControl control="textarea" type="description" name="description" label="Description" interfaceDetails={interfaceDetails} totalCharacters={300} height={"200px"}/>
                 <FormikControl control="quill" type="features" name="features" label="Features" interfaceDetails={interfaceDetails} height={"500px"}/>
                 <FormikControl control="dropdown" type="selectedFlavors" name="selectedFlavors" label="Select Flavors" interfaceDetails={interfaceDetails} arrayOfAvailableOptions={Flavors?Flavors:[]}/>
                 <FormikControl control="dropdown" type="selectedBrand" name="selectedBrand" label="Select Brand" interfaceDetails={interfaceDetails} arrayOfAvailableOptions={Brands?Brands:[]} allowSingleOption={true}/>
                 <FormikControl control="image" type="image" name="image" label="Image" interfaceDetails={interfaceDetails} height={"200px"} formik={formik} notRequired={true}/>
                 <div className="row justify-content-center">
                    <div className="col-12 col-md-6 mb-4 text-center">
                      <button type="submit" className={styles.add_product_btn} disabled={formik.isSubmitting}>Add Product</button>
                    </div>
                  </div>
              </Form>
            }}
          </Formik>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default UpdateProduct;
