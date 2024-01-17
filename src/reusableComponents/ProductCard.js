import React, { useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import "./styles/ProductCard.css";
// import Button from "react-bootstrap/Button";
import {ExclamationCircleTwoTone} from '@ant-design/icons';
import navbarlogo from "../logoWithoutBackground.png";
import { Button, Popconfirm, ConfigProvider } from 'antd';
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProductInfo } from "../redux/ProductInfo/ProductInfoAction";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import {ShimmerThumbnail} from "react-shimmer-effects";
import alternate from "./assets/imageAlternate.svg";
import { DANGER, SUCCESS, WHITE } from "../values/Colors";
import ConfirmationModal from "../utils/ConfirmationModal";
import { CONVERT_TIMESTAMP_TO_DATE_TIME } from "../utils/genericFunctions";

const ProductCard = ({ product }) => {
  const [ImageURL, setImageURL] = useState(null);
  const firebase = useFirebase();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleoffCanvasClose = () => setoffCanvasShow(false);
  const handleoffCanvasShow = () => setoffCanvasShow(true);
  const [offCanvasShow, setoffCanvasShow] = useState(false);
  const deleteProduct = async () => {
    await firebase.deleteProduct(product.identity, product.category);
    document.getElementById(product.identity).classList.add("d-none");
    setShow(false);
  };
  const isLoggedIn = useSelector((state) => state.admin.adminIsLoggedIn);
  const [LoaderState, setLoaderState] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteHandler = () => {
    handleoffCanvasClose();
    handleShow();
  };
  const viewHandler = () => {
    dispatch(setProductInfo({ product }));
    navigate(`/product/view/${product.identity}`);
  };
  const updateHandler = () => {
    console.log("update handler called")
    navigate(`/product/update/${product.category}/${product.identity}`);
  };
  useEffect(() => {
    const fetch = async () => {
      setLoaderState(true);
      try {
        const image = await firebase.getImageURL(product.identity);
        setImageURL(image);
        setLoaderState(false);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetch();
  }, [product]);
  return (
    <div className="col-6 col-sm-4 col-lg-3 product-card-col px-1 px-lg-2"id={`${product.identity}`}>
      {/* <div className="row">
        <div className="col drop-shadow">
          {show&&<ConfirmationModal query={`Are you sure you want to delete ${product.ProductName}`} confirmationOption={"Delete"} onConfirmHandler={deleteProduct}/>}
        </div>
      </div> */}
      <Offcanvas show={offCanvasShow} onHide={handleoffCanvasClose} scroll={false} backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="w-100">
            
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="row m-0 justify-content-center">
          <div className="col text-center align-self-center">
            <img src={ImageURL} style={{ height: "200px", maxWidth: "200px",borderRadius:"100%" }} />
            <p style={{ fontWeight: "700", marginTop: "10px" }}>{product.ProductName}</p>
          </div>
        </div>
        <p style={{fontSize:"12px"}}><strong>Identity : </strong>{product.identity}</p>
        <p style={{fontSize:"12px"}}><strong>Category : </strong>{product.category}</p>
        <p style={{fontSize:"12px"}}> <strong>Brand : </strong> {product.selectedBrand}</p>
        <p style={{fontSize:"12px"}}><strong>Added On : </strong>{CONVERT_TIMESTAMP_TO_DATE_TIME(product.listingDate)}</p>
        <p style={{fontSize:"12px"}}><strong>Description : </strong>{product.Description}</p>
        
        {product.selectedFlavors && product.selectedFlavors.length > 0 && (
              <p style={{fontSize:"12px"}}><strong>Flavors : </strong>{product.category}
              {product.selectedFlavors.map((flavor,index) => (
                <span key={index}>{flavor}{', '}</span>
              ))}
              </p>
          )}
          <span className="product-card-off-canvas-options text-center">
           <Popconfirm placement={"bottomRight"} title={"Are you sure you want to Delete?"} okText={"Delete"}  cancelText="Cancel" onConfirm={deleteProduct} icon={<ExclamationCircleTwoTone  twoToneColor="#ff0000" />}>
             <Button><i className="fa-solid fa-trash me-3"></i> Delete</Button>
           </Popconfirm>
          <Button onClick={updateHandler}><i className="fa-solid fa-pen me-3" ></i> Update</Button>
          </span>
      </Offcanvas.Body>
      </Offcanvas>
      <Card style={{ width: "100%", height: "auto" }} className="product-card">
        {isLoggedIn && (
          <Card.Text className="product-card-brandName position-absolute w-100 text-end">
            <i className="fa-solid fa-ellipsis-vertical float-end" style={{paddingRight: "10px",paddingTop: "10px",fontSize: "15px",}}onClick={() => handleoffCanvasShow()}/>
          </Card.Text>
        )}
        {LoaderState? <ShimmerThumbnail className={"product-card-img"}/>:
         <Card.Img variant="top" onClick={viewHandler} src={ImageURL} className={`product-card-img ${LoaderState ? "w-50 my-auto mx-auto" : ""}`}/>}
        
        <Card.Body className="product-card-body d-flex flex-column justify-content-between" onClick={viewHandler}>
          <div> 
            <div className="row">
              <div className="col text-center mb-2 mt-3">
              <Card.Text className="product-card-brandName">{product.category}</Card.Text>
              </div>
            </div>
            <Card.Title className="product-card-color"><h4 className="product-card-heading"><strong>{product.ProductName}</strong></h4></Card.Title>
            <Card.Text className="product-card-brandName"><strong>Brand : </strong> {product.selectedBrand}</Card.Text>
            <Card.Text className="product-card-description">{product.Description.length > 100? `${product.Description.slice(0, 100)}. . .`: product.Description}</Card.Text>
          </div>
          <div className="text-center my-2">
            <Button className="product-card-btn " onClick={viewHandler}>View</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
