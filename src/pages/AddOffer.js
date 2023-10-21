import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  DropdownButton,
  Dropdown,
  InputGroup,
  Form,
} from "react-bootstrap";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import { useFirebase } from "../context/firebase";
import FormPageSkeleton from "../skeletons/FormPageSkeleton";
import "../components/styles/Form.css";

const AddOffer = () => {
  const formControlRef = useRef(null);
  const [ProductName, setProductName] = useState();
  const [Description, setDescription] = useState();
  const [Features, setFeatures] = useState();
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [Brands, setBrands] = useState([]);
  const [Flavors, setFlavors] = useState([]);
  const [Image, setImage] = useState("");
  const [OfferDescription, setOfferDescription] = useState();
  const [RemainingDays, setRemainingDays] = useState();
  const [RemainingHours, setRemainingHours] = useState();

  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [LoaderState, setLoaderState] = useState(false);
  const firebase = useFirebase();

  function calculateExpiration(hours, days) {
    const hoursInMillis = hours * 60 * 60 * 1000;
    const daysInMillis = days * 24 * 60 * 60 * 1000;
    const expirationTime = Date.now() + hoursInMillis + daysInMillis;
    const expirationDate = new Date(expirationTime);
    console.log(expirationDate);
    return expirationTime;
  }
  const wrapSelectedTextWithAsterisks = (e) => {
    // Check if the event's key is 'b' and Ctrl (or Command) key is pressed
    if ((e.key === 'b' || e.key === 'B') && (e.ctrlKey || e.metaKey)) {
      const formControl = formControlRef.current;
      if (formControl) {
        const selectionStart = formControl.selectionStart;
        const selectionEnd = formControl.selectionEnd;
        const inputValue = formControl.value;
        const selectedText = inputValue.slice(selectionStart, selectionEnd);
        const replacementText = `*${selectedText}*`;
        const newValue =
          inputValue.slice(0, selectionStart) + replacementText + inputValue.slice(selectionEnd);
        setFeatures(newValue);
        formControl.focus();
        formControl.selectionStart = selectionStart;
        formControl.selectionEnd = selectionStart + replacementText.length;
      }
    }
  };
  const SubmitHandler = async () => {
    setShowToast2(false);
    setShowToast1(false);
    if (
      !selectedBrand ||
      !ProductName ||
      !Description ||
      !Image ||
      !RemainingDays ||
      !RemainingHours ||
      !OfferDescription
    ) {
      setShowToast2(false);
      setTimeout(() => {
        setShowToast2(true);
      }, 10);
      return; // Exit the function and prevent form submission
    }
    setLoaderState(true);
    const ExpirationTime = calculateExpiration(RemainingHours, RemainingDays);
    if (
      await firebase.addNewOffer(
        ProductName,
        Description,
        Features,
        selectedBrand,
        selectedFlavors,
        OfferDescription,
        ExpirationTime,
        Image
      )
    ) {
      clearAllFields();
      setLoaderState(false);
      setShowToast1(true);
    }
  };
  const clearAllFields=()=>{
    setProductName();
    setDescription();
    setFeatures();
    setSelectedFlavors([])
    setSelectedBrand();
    setImage("")
    setRemainingDays();
    setRemainingHours();
    }
  const flavorHandler = (flavor) => {
    if (!selectedFlavors.includes(flavor)) {
      setSelectedFlavors((prevSelectedFlavors) => [
        ...prevSelectedFlavors,
        flavor,
      ]);
    }
  };
  const setDataViaCheck=(value,limit,callBack)=>{
    if(value.length<=limit){
      callBack(value)
    }
  }
  const removeFlavor = (flavorToRemove) => {
    setSelectedFlavors((prevSelectedFlavors) =>
      prevSelectedFlavors.filter(
        (selectedFlavor) => selectedFlavor !== flavorToRemove
      )
    );
  };
  useEffect(() => {
    
    document.addEventListener("keydown", wrapSelectedTextWithAsterisks);
    const fetch = async () => {
      setFlavors(await firebase.getFlavors());
      setBrands(await firebase.getBrands());
    };
    fetch();
  }, [selectedFlavors]);
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true} />
      <Title name={`Add New Offer`} />
      <div className="row m-0">
        <div className="col-4 col-lg-3 d-md-block d-none">
          <SearchBar />
        </div>
        <div className="col-lg-9 col-12 col-md-8">
          <div className="row m-0 justify-content-center">
            <div className="col-11">
              {LoaderState ? (
                <FormPageSkeleton></FormPageSkeleton>
              ) : (
                <Form>
                  <MyToast
                    text={"Offer Added Successfully!!"}
                    showHandler={showToast1}
                  ></MyToast>
                  <MyToast text={"Please fill All Required Fields"} showHandler={showToast2}></MyToast>
                  <Form.Group className="mb-3">
                    <Form.Label className="FormLabels">
                      Offer Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder={"Enter Offer Description..."}
                      value={OfferDescription}
                      style={{ height: "100px" }}
                      onChange={(e) => setDataViaCheck(e.target.value,300,setOfferDescription)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="FormLabels">
                      Remaining Days
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={"Enter Remaining Days..."}
                      value={RemainingDays}
                      onChange={(e) => setDataViaCheck(e.target.value,2,setRemainingDays)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="FormLabels">
                      Remaining Hours
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={RemainingHours}
                      placeholder={"Enter Remaining Hours..."}
                      onChange={(e) => setDataViaCheck(e.target.value,2,setRemainingHours)}
                      required
                    />
                  </Form.Group>
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
                      ref={formControlRef}
                      placeholder={"Enter Features..."}
                      value={Features}
                      style={{ height: "300px" }}
                      onChange={(e) => setFeatures(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="FormLabels">
                      Choose Product Image
                    </Form.Label>
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
                    >
                      {Brands.map((brand, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => setSelectedBrand(brand.brandName)}
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
                      className="form-dropdown-btn"
                    >
                      {Flavors.map((flavor, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => flavorHandler(flavor.flavorName)}
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
                        className="btn btn-danger btn-sm m-1"
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
                            style={{
                              backgroundColor: "#00bc00",
                              width: "100%",
                            }}
                            type="submit"
                          >
                            Add Offer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default AddOffer;
