import React, { useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import LoaderDark from "../reusableComponents/LoaderDark";
import './styles/HomeProductCard.css'
import '../skeletons/styles/ProductPageSkeleton.css'
import alternate from './assets/imageAlternate.svg'
const HomeProductCard = ({ product }) => {
    const firebase = useFirebase();
    const [imageURL, setimageURL] = useState('');
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
      }, [imageURL,product]);
  return (
    <div className="col-6 col-sm-4 col-md-3">
      <Card className="product-card">
        {LoaderState ? (
          <Card.Img
          variant="top"
          className="product-card-img w-50 mx-auto my-auto"
          src={alternate} // Use the stored imageURL
        />
        ) : (
          <Card.Img
            variant="top"
            className="product-card-img"
            src={imageURL} // Use the stored imageURL
          />
        )}

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
            <Button className="product-card-btn">View</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HomeProductCard;
