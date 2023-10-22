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
import { useParams } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Loader from "../reusableComponents/Loader";
import LoaderDark from "../reusableComponents/LoaderDark";
import MyToast from "../reusableComponents/Toast";
import { useNavigate } from "react-router-dom";
import FormPageSkeleton from "../skeletons/FormPageSkeleton";
const UpdateProduct = () => {
  const navigate=useNavigate()
  const { productID, category } = useParams();
  const firebase = useFirebase();
  const [Product, setProduct] = useState({});
  const [LoaderState, setLoaderState] = useState(false);
  const [Image, setImage] = useState("");
  const productInfo = useSelector((state) => state.productInfo.productInfo);
  const [ProductName, setProductName] = useState();
  const [Description, setDescription] = useState();
  const [Features, setFeatures] = useState();
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [Brands, setBrands] = useState([]);
  const [Flavors, setFlavors] = useState([]);
  const [Rerenderer, setRerenderer] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const SubmitHandler = async () => {
    // Clear any previous error messages
    setShowToast1(false);
    // Validate the required fields
    if (!selectedBrand || !ProductName || !Description) {
      
      setShowToast2(false);
      setTimeout(() => {
        setShowToast2(true);
      }, 10);
      return; // Exit the function and prevent form submission
    }

    // If all required fields are filled in, proceed with adding the product\
    setLoaderState(true);
    if (
      await firebase.updateProduct(
        ProductName,
        Description,
        Features,
        selectedBrand,
        selectedFlavors,
        category,
        productID,
        Image
      )
    ) {
      navigate(`/home`)
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
  }
  const setDataViaCheck = (value, limit, callBack) => {
    if (value.length <= limit) {
      callBack(value);
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
      const data = await firebase.getProductByIdentity(productID, category);
      setProduct(data);
      setProductName(Product.ProductName);
      setDescription(Product.Description);
      setSelectedBrand(Product.selectedBrand);
      setSelectedFlavors(Product.selectedFlavors);
      setFlavors(await firebase.getFlavors());
      setBrands(await firebase.getBrands());
      setFeatures(Product.Features)
      setRerenderer(true);
      setLoaderState(false);
    };
    fetch();
  }, [Rerenderer]);
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true} />
      <Title name={`Update`} />
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
                    text={"Product Updated Successfully!!"}
                    showHandler={showToast1}
                  ></MyToast>
                  <MyToast
                    text={"Please fill Required Fields"}
                    showHandler={showToast2}
                  ></MyToast>
                  <Form.Group className="mb-3">
                    <Form.Label className="FormLabels">Product Name</Form.Label>
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
                    <Form.Label className="FormLabels">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      required
                      placeholder={"Enter Description..."}
                      value={Description}
                      style={{ height: "100px" }}
                      onChange={(e) =>
                        setDataViaCheck(e.target.value, 300, setDescription)
                      }
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
                          <MyButton
                            text={"Update Product"}
                            handler={SubmitHandler}
                            color={"#00bc00"}
                            width={100}
                          ></MyButton>
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

export default UpdateProduct;
