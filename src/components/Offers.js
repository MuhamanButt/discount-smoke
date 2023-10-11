import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import Heading from "../reusableComponents/Heading";
import giftImage from "./assets/gift.png";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { setProductInfo } from "../redux/ProductInfo/ProductInfoAction";
import { useDispatch } from "react-redux";
import alternate from "./assets/imageAlternate.svg";
import "./styles/Offer.css";
const Offers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [Data, setData] = useState([]);
  const [Rerenderer, setRerenderer] = useState(false);
  const [imageURLs, setImageURLs] = useState([]); // Array to store image URLs
  const isLoggedIn = useSelector((state) => state.admin.adminIsLoggedIn);
  const [show, setShow] = useState(false);
  const [itemToDelete, setitemToDelete] = useState("");
  const [LoaderState, setLoaderState] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteOffer = async () => {
    await firebase.deleteOffer(itemToDelete);
    document.getElementById(itemToDelete).classList.add("d-none");
    handleClose();
    setRerenderer(!Rerenderer);
  };
  const deleteHandler = (identity) => {
    setitemToDelete(identity);
    handleShow();
  };
  const updateHandler = async (data) => {
    dispatch(setProductInfo(data));
    navigate(`/offer/update/${data.identity}`);
  };
  const getDays = (timestamp, identity) => {
    calculateRemainingTime(timestamp, identity);
    const currentTime = new Date().getTime();
    const timeDifference = timestamp - currentTime;
    return Math.floor(timeDifference / 86400000);
  };
  const getHours = (timestamp, identity) => {
    calculateRemainingTime(timestamp, identity);
    const currentTime = new Date().getTime();
    const timeDifference = timestamp - currentTime;
    return Math.floor((timeDifference % 86400000) / 3600000);
  };
  const getMins = (timestamp, identity) => {
    calculateRemainingTime(timestamp, identity);
    const currentTime = new Date().getTime();
    const timeDifference = timestamp - currentTime;
    return Math.floor((timeDifference % 3600000) / 60000);
  };
  const calculateRemainingTime = async (timestamp, identity) => {
    const currentTime = new Date().getTime();
    const timeDifference = timestamp - currentTime;

    if (timeDifference <= 0) {
      firebase.deleteOffer(identity);
      return;
    }
  };
  const getImage = async (imageURL) => {
    const image = await firebase.getImageURL(imageURL);
    return image;
  };
  useEffect(() => {
    const fetch = async () => {
      const result = await firebase.getOffers();
      setData(result);
      setRerenderer(true);
    };
    fetch();
  }, [Rerenderer]);
  useEffect(() => {
    const loadImages = async () => {
      setLoaderState(true);
      const urls = await Promise.all(
        Data.map((dataItem) => firebase.getImageURL(dataItem.identity))
      );
      setImageURLs(urls);
      setLoaderState(false);
    };

    if (Data.length > 0) {
      loadImages();
    }
  }, [Data]);
  return (
    <>
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
              <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontWeight: "600" }}>
              Are you sure you want to delete this offer?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="danger"
                onClick={deleteOffer}
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
      {Data.length === 0 ? (
        ""
      ) : (
        <div
          style={{ backgroundColor: "#efefef" }}
          className="overflow-x-hidden"
        >
          <div data-aos="fade-left">
            <Heading
              text={"LIMITED TIME DISCOUNT OFFERS"}
              backgroundColor={"#efefef"}
            ></Heading>
            <Carousel data-bs-theme="dark">
              {Data.map((data, index) => (
                <Carousel.Item id={data.identity} key={index}>
                  <div className="row justify-content-center offer">
                    <div className="col text-center mb-5">
                      <p className="mb-2 offer-description">
                        {data.OfferDescription}
                      </p>
                      <div className="row justify-content-center">
                        <div className="col-6 col-sm-4 mb-3">
                          <img src={giftImage} alt="" className="w-100" />
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-2 col-sm-1 text-center">
                          <strong>
                            {" "}
                            <h3 className="m-0">
                              {getDays(data.ExpirationTime, data.identity)}
                            </h3>
                          </strong>
                          <p>Days</p>
                        </div>
                        <div className="col-2 col-sm-1 text-center">
                          <strong>
                            <h3 className="m-0">
                              {getHours(data.ExpirationTime, data.identity)}
                            </h3>
                          </strong>
                          <p>Hours</p>
                        </div>
                        <div className="col-2 col-sm-1 text-center">
                          <strong>
                            <h3 className="m-0">
                              {getMins(data.ExpirationTime, data.identity)}
                            </h3>
                          </strong>
                          <p>Mins</p>
                        </div>
                      </div>
                      <div className="row justify-content-center mb-4">
                        <div className="col-9">
                          <div className="row justify-content-center">
                            <div className="col-11 col-sm-4 align-self-center text-center">
                              <img
                                src={
                                  !LoaderState ? imageURLs[index] : alternate
                                }
                                alt=""
                                className={`offer-img ${
                                  LoaderState ? "w-100 my-auto mx-auto" : ""
                                }`}
                              />
                            </div>
                            <div className="col-11 col-sm-6 align-self-center me-0 me-sm-3 ms-sm-5 ms-3 text-start">
                              <h3 className="offer-productName">
                                {data.ProductName}
                              </h3>
                              <p className="offer-brandName">
                                <strong>Brand : </strong>
                                {data.selectedBrand}
                              </p>
                              <p className="offer-text">{data.Description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {isLoggedIn ? (
                        <>
                          <div className="row justify-content-evenly">
                            <div className="col">
                              <div className="row justify-content-center">
                                <div className="col-5 col-sm-4 col-md-3">
                                  <Button
                                    style={{
                                      backgroundColor: "#880000",
                                      width: "100%",
                                      marginRight: "5px",
                                    }}
                                    onClick={() => deleteHandler(data.identity)}
                                    className="offer-btns"
                                  >
                                    Delete Offer
                                  </Button>
                                </div>
                                <div className="col-6 col-sm-5 col-md-3">
                                  <Button
                                    style={{
                                      backgroundColor: "#030F2B",
                                      width: "100%",
                                      marginLeft: "5px",
                                    }}
                                    onClick={() => updateHandler(data)}
                                    className="offer-btns"
                                  >
                                    Update Offer
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};

export default Offers;
