import React from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import { useSelector } from "react-redux";
import { useFirebase } from "../context/firebase";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../components/styles/Form.css";
import MyButton from "../reusableComponents/MyButton";
import { Button } from "react-bootstrap";
import MyToast from "../reusableComponents/Toast";
import FormPageSkeleton from "../skeletons/FormPageSkeleton";
import { useNavigate } from "react-router-dom";
const UpdateOffer = () => {
  const productInfo = useSelector((state) => state.productInfo.productInfo);
  const firebase = useFirebase();
  const navigate=useNavigate();
  const [Product, setProduct] = useState({});
  const [LoaderState, setLoaderState] = useState(false);
  const [Image, setImage] = useState("");
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [ProductName, setProductName] = useState();
  const [Description, setDescription] = useState();
  const [Features, setFeatures] = useState();
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [Brands, setBrands] = useState([]);
  const [Flavors, setFlavors] = useState([]);
  const [RemainingHours, setRemainingHours] = useState(0);
  const [RemainingDays, setRemainingDays] = useState(0);
  const [RemainingMinutes, setRemainingMinutes] = useState(0);
  const [OfferDescription, setOfferDescription] = useState(
    "Enter Offer Description..."
  );
  const [Rerenderer, setRerenderer] = useState(false);
  const [Identity, setIdentity] = useState(0);
  function calculateExpiration(hours, days) {
    const hoursInMillis = hours * 60 * 60 * 1000;
    const daysInMillis = days * 24 * 60 * 60 * 1000;
    const expirationTime = Date.now() + hoursInMillis + daysInMillis;
    const expirationDate = new Date(expirationTime);
    console.log(expirationDate);
    return expirationTime;
  }
  function calculateRemainingHours(timestamp) {
    const timeDifference = timestamp - Date.now();
    return Math.floor(timeDifference / (1000 * 60 * 60));
  }
  function calculateRemainingDays(timestamp) {
    const timeDifference = timestamp - Date.now();
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }
  function calculateRemainingMinutes(timestamp) {
    const timeDifference = timestamp - Date.now();
    return Math.floor(timeDifference / (1000 * 60));
  }
  const setDataViaCheck = (value, limit, callBack) => {
    if (value.length <= limit) {
      callBack(value);
    }
  };
  const SubmitHandler = async () => {
    setShowToast1(false);
    setShowToast2(false);
    if (
      !selectedBrand ||
      !ProductName ||
      !Description ||
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
      await firebase.updateOffer(
        ProductName,
        Description,
        Features,
        selectedBrand,
        selectedFlavors,
        OfferDescription,
        ExpirationTime,
        Identity,
        Image
      )
    ) {
      setLoaderState(false);
      setShowToast1(true);
      navigate('/home')
    }
  };
  
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
      
    setLoaderState(true);
      setProduct(productInfo);
      setProductName(Product.ProductName);
      setDescription(Product.Description);
      setSelectedBrand(Product.selectedBrand);
      setSelectedFlavors(Product.selectedFlavors);
      setFeatures(Product.Features)
      setFlavors(await firebase.getFlavors());
      setBrands(await firebase.getBrands());
      setRerenderer(true);
      setRemainingDays(calculateRemainingDays(Product.ExpirationTime));
      setRemainingHours(calculateRemainingHours(Product.ExpirationTime));
      setRemainingMinutes(calculateRemainingMinutes(Product.ExpirationTime));
      setOfferDescription(Product.OfferDescription);
      setIdentity(Product.identity);
      setRerenderer(true);
      setLoaderState(false);
    };
    fetch();
  }, [Rerenderer]);
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true} />
      <Title name={`Update Offer`} />
      <div className="row m-0">
        <div className="col-4 col-lg-3 d-md-block d-none">
          <SearchBar />
        </div>
        <div className="col-lg-9 col-12 col-md-8">
          <div className="row m-0 justify-content-center">
            <div className="col-11">
              <Form>
                <MyToast
                  text={"Offer Updated Successfully!!"}
                  showHandler={showToast1}
                ></MyToast>

                <MyToast
                  text={"Please fill the required fields!!"}
                  showHandler={showToast2}
                ></MyToast>
                {LoaderState ? (
                  <FormPageSkeleton></FormPageSkeleton>
                ) : (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label className="FormLabels">
                        Offer Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder={"Enter Offer Description..."}
                        value={OfferDescription}
                        style={{ height: "100px" }}
                        onChange={(e) =>
                          setDataViaCheck(
                            e.target.value,
                            300,
                            setOfferDescription
                          )
                        }
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
                        onChange={(e) =>
                          setDataViaCheck(e.target.value, 2, setRemainingDays)
                        }
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
                        onChange={(e) =>
                          setDataViaCheck(e.target.value, 2, setRemainingHours)
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="FormLabels">
                        Product Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={"Enter Product Name..."}
                        value={ProductName}
                        onChange={(e) =>
                          setDataViaCheck(e.target.value, 30, setProductName)
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="FormLabels">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder={"Enter Description..."}
                        value={Description}
                        style={{ height: "100px" }}
                        onChange={(e) =>
                          setDataViaCheck(e.target.value, 300, setDescription)
                        }
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
                      <Form.Label className="FormLabels">
                        Choose Product Image
                      </Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
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
                        {Brands &&
                          Brands.map((brand, index) => (
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
                        {Flavors &&
                          Flavors.map((flavor, index) => (
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
                      {selectedFlavors &&
                        selectedFlavors.map((flavor, index) => (
                          <Button
                            key={index}
                            onClick={() => removeFlavor(flavor)}
                            className="btn btn-danger btn-sm m-1 "
                            style={{ borderRadius: "10px" }}
                          >
                            {flavor}{" "}
                            <span
                              aria-hidden="true"
                              className="float-end fs-16"
                            >
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
                              Update Offer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default UpdateOffer;
