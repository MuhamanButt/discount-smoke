import React, { useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./styles/HomeProductCard.css";
import "../skeletons/styles/ProductPageSkeleton.css";
import alternate from "../assets/imageAlternate.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProductInfo } from "../redux/ProductInfo/ProductInfoAction";
import { ShimmerThumbnail } from "react-shimmer-effects";
const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewHandler = () => {
    dispatch(setProductInfo({ product }));
    navigate(`/product/view/${product.identity}`);
  };
  const firebase = useFirebase();
  const [imageURL, setimageURL] = useState("");
  const [LoaderState, setLoaderState] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      setLoaderState(true);
      try {
        const image = await firebase.getImageURL(product.identity);
        setimageURL(image);
        setTimeout(() => setLoaderState(false), 200);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetch();
  }, [imageURL, product]);
  return (
      <Card className="home-product-card">
        {LoaderState ? (
          <ShimmerThumbnail className={"home-product-card-img"}/>
        ) : (
          <Card.Img
            variant="top"
            onClick={viewHandler}
            className="home-product-card-img"
            src={imageURL} // Use the stored imageURL
          />
        )}

        <Card.Body
          className="home-product-card-body d-flex flex-column justify-content-between"
          onClick={viewHandler}
        >
          <div>
            <Card.Title className="home-product-card-color">
              <h4 className="home-product-card-heading">
                <strong>{product.ProductName}</strong>
              </h4>
            </Card.Title>
            <Card.Text className="home-product-card-brandName mb-2">
              <strong>Brand : </strong> {product.selectedBrand}
            </Card.Text>
            <Card.Text className="home-product-card-description">
              {product.Description.length > 100
                ? `${product.Description.slice(0, 100)}. . .`
                : product.Description}
            </Card.Text>
          </div>
          <div className="text-center">
            <Button className="product-card-btn" onClick={viewHandler}>View</Button>
          </div>
        </Card.Body>
      </Card>
  );
};

export default HomeProductCard;
