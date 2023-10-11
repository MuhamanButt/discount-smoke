import React, { useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import "./styles/ProductCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import LoaderDark from "./LoaderDark";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProductInfo } from "../redux/ProductInfo/ProductInfoAction";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import maleAvatar from "./assets/maleAvatar.svg";
import Modal from "react-bootstrap/Modal";
import alternate from "./assets/imageAlternate.svg";

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
  function timestampToDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    const dateTimeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${year}-${formattedMonth}-${formattedDay} `;

    return dateTimeString;
  }
  const viewHandler = () => {
    dispatch(setProductInfo({ product }));
    navigate(`/product/view/${product.identity}`);
  };
  const updateHandler = () => {
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
    <div
      className="col-6 col-sm-4 col-lg-3 product-card-col px-1 px-lg-2"
      id={`${product.identity}`}
    >
      <div className="row">
        <div className="col drop-shadow">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header
              closeButton
              style={{
                background:
                  "linear-gradient(151deg, rgba(125,23,23,1) 0%, rgba(225,42,42,1) 100%)",
                color: "white",
              }}
            >
              <Modal.Title>
                <i class="fa-solid fa-triangle-exclamation me-3"></i>Delete
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontWeight: "600" }}>
              Are you sure you want to delete {product.ProductName}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="danger"
                onClick={deleteProduct}
                style={{
                  background:
                    "linear-gradient(151deg, rgba(125,23,23,1) 0%, rgba(255,75,75,1) 100%)",
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Offcanvas
        show={offCanvasShow}
        onHide={handleoffCanvasClose}
        scroll={false}
        backdrop={true}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="w-100">
            
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="row m-0 justify-content-center">
              <div className="col text-center align-self-center">
                <img
                  src={ImageURL}
                  style={{ height: "200px", maxWidth: "200px",borderRadius:"100%" }}
                />
                <p style={{ fontWeight: "700", marginTop: "10px" }}>{product.ProductName}</p>
              </div>
            </div>
          <p style={{fontSize:"12px"}}><strong>Identity : </strong>{product.identity}</p>
          <p style={{fontSize:"12px"}}><strong>Category : </strong>{product.category}</p>
          <p style={{fontSize:"12px"}}> <strong>Brand : </strong> {product.selectedBrand}</p>
          <p style={{fontSize:"12px"}}><strong>Added On : </strong>{timestampToDateTime(product.listingDate)}</p>
          <p style={{fontSize:"12px"}}><strong>Description : </strong>{product.Description}</p>
          
          {product.selectedFlavors &&
            product.selectedFlavors.length > 0 ? (
              <>
                <p style={{fontSize:"12px"}}><strong>Flavors : </strong>{product.category}
                {product.selectedFlavors.map((flavor,index) => (
                  <span key={index}>{flavor}{' '}</span>
                ))}
                </p>
              </>
            ) : (
              ""
            )}
          <Button
            className="product-card-delete-btn btn-one "
            onClick={deleteHandler}
          >
            <i className="fa-solid fa-trash me-4"></i>
            Delete
          </Button>
          <Button
            className="product-card-update-btn btn-one"
            onClick={updateHandler}
          >
            <i class="fa-solid fa-pen me-4"></i>
            Update
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      <Card style={{ width: "100%", height: "280px" }} className="product-card">
        {isLoggedIn ? (
          <Card.Text className="product-card-brandName">
            <i
              className="fa-solid fa-ellipsis-vertical float-end"
              style={{
                paddingRight: "10px",
                paddingTop: "10px",
                fontSize: "15px",
              }}
              onClick={() => handleoffCanvasShow()}
            ></i>
          </Card.Text>
        ) : (
          ""
        )}

        <Card.Img
          variant="top"
          src={LoaderState ? alternate : ImageURL}
          className={`product-card-img ${LoaderState ? "w-50 my-auto mx-auto" : ""}`}
        />

        <Card.Body className="product-card-body d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="product-card-color">
              <h4 className="product-card-heading">
                <strong>{product.ProductName}</strong>
              </h4>
            </Card.Title>
            <Card.Text className="product-card-brandName">
              <strong>Brand : </strong> {product.selectedBrand}
            </Card.Text>
            <Card.Text className="product-card-description">
              {product.Description.length > 100
                ? `${product.Description.slice(0, 100)}. . .`
                : product.Description}
            </Card.Text>
          </div>
          <div className="text-center">
            <Button className="product-card-btn" onClick={viewHandler}>
              View
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
