import React, { useEffect } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./styles/Form.css";
import MyButton from "../reusableComponents/MyButton";
import { Button } from "react-bootstrap";
import { useFirebase } from "../context/firebase";
import MyToast from "../reusableComponents/Toast";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Loader from "../reusableComponents/Loader";
import LoaderDark from "../reusableComponents/LoaderDark";
import FormPageSkeleton from "../skeletons/FormPageSkeleton";
const MyForm = ({ category }) => {
  const [Data, setData] = useState({});
  const [ProductName, setProductName] = useState();
  const [Description, setDescription] = useState();
  const [Features, setFeatures] = useState();
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [Brands, setBrands] = useState([]);
  const [Flavors, setFlavors] = useState([]);
  const [Image, setImage] = useState("");
  const [showToast1, setshowToast1] = useState(false);
  const [showToast2, setshowToast2] = useState(false);
  const [reRender, setreRender] = useState(false);
  const [LoaderState, setLoaderState] = useState(false);
  const firebase = useFirebase();
  const SubmitHandler = async () => { 
    setshowToast2(false);
    setshowToast1(false);
    // Validate the required fields
    if (!selectedBrand||!ProductName||!Description||!Image) {
      setshowToast2(false);
      setTimeout(() => {
        setshowToast2(true);
      }, 10);
      return; // Exit the function and prevent form submission
    }


    // If all required fields are filled in, proceed with adding the product
    setLoaderState(true);
    if (
      await firebase.addNewProduct(
        ProductName,
        Description,
        Features,
        selectedBrand,
        selectedFlavors,
        Image,
        category
      )
    ) {
      clearAllFields();
      setLoaderState(false);
      setshowToast1(true);
    }
  };
const clearAllFields=()=>{
setProductName();
setDescription();
setFeatures();
setSelectedFlavors([])
setSelectedBrand();
setImage("")
}
  const setDataViaCheck=(value,limit,callBack)=>{
    if(value.length<=limit){
      callBack(value)
    }
  }
  const flavorHandler = (flavor) => {
    if (!selectedFlavors.includes(flavor)) {
      setSelectedFlavors((prevSelectedFlavors) => [
        ...prevSelectedFlavors,
        flavor,
      ]);
    }
  };
  const removeFlavor = (flavorToRemove) => {
    setSelectedFlavors((prevSelectedFlavors) =>
      prevSelectedFlavors.filter(
        (selectedFlavor) => selectedFlavor !== flavorToRemove
      )
    );
  };
  useEffect(() => {
    const fetch = async () => {
      setFlavors(await firebase.getFlavors());
      setBrands(await firebase.getBrands());
    };
    fetch();
  }, [selectedFlavors,showToast1,showToast2]);
  return (
    <div>
      {LoaderState ? (
        <FormPageSkeleton></FormPageSkeleton>
      ) : (
        <Form>
          
          <MyToast text={"Please fill All Required Fields"} showHandler={showToast2}></MyToast>
          <MyToast text={"Product Added SuccessFully!!"} showHandler={showToast1}></MyToast>
          
          <Form.Group className="mb-3">
            <Form.Label className="FormLabels">Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={"Enter Product Name..."}
              value={ProductName}
              onChange={(e) => setDataViaCheck(e.target.value,30,setProductName)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="FormLabels">Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={"Enter Description..."}
              value={Description}
              style={{ height: "100px" }}
              onChange={(e) => setDataViaCheck(e.target.value,300,setDescription)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="FormLabels">Features</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={"Enter Features..."}
              value={Features}
              style={{ height: "300px" }}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="FormLabels">Choose Product Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="form-image"
            />
          </Form.Group>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Text input with dropdown button"
              value={selectedBrand}
              readOnly
            />

            <DropdownButton
              variant="outline-secondary"
              title="Brand"
              id="input-group-dropdown"
              align="end"
              className="drop-shadow"
            >
              {Brands.map((brand, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => setSelectedBrand(brand.brandName)}
                  className="ButtonHover"
                >
                  {brand.brandName}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title="Flavors"
              id="input-group-dropdown"
              align="end"
              className="form-dropdown-btn drop-shadow"
            >
              {Flavors.map((flavor, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => flavorHandler(flavor.flavorName)}
                  className="dropdown-item-btn ButtonHover"
                >
                  {flavor.flavorName}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
          <div className="mb-3">
            {selectedFlavors.map((flavor, index) => (
              <Button
                key={index}
                onClick={() => removeFlavor(flavor)}
                className="btn btn-danger btn-sm m-1 "
                style={{ borderRadius: "10px" }}
              >
                {flavor}{" "}
                <span aria-hidden="true" className="float-end fs-16">
                  &times;
                </span>
              </Button>
            ))}
          </div>

          <div className="row justify-content-center">
            <div className="col text-center mb-5">
              <div className="row justify-content-center">
                <div className="col-sm-6 text-end col-12">
                  <Button
                    onSubmit={SubmitHandler}
                    onClick={SubmitHandler}
                    style={{ backgroundColor: "#00bc00", width: "100%" }}
                   
                  >
                    Add Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
};

export default MyForm;
