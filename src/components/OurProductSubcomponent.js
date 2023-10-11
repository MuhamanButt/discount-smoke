import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import LoaderDark from "../reusableComponents/LoaderDark";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { useFirebase } from "../context/firebase";
import HomeProductCard from "./HomeProductCard";

const OurProductSubcomponent = ({ dataToShow }) => {
  const [Products, setProducts] = useState(null);
  const [LoaderState, setLoaderState] = useState(false);
  const [imageURL, setImageURL] = useState([]); // Store image URLs here
  const firebase = useFirebase();

  useEffect(() => {
    setProducts(dataToShow);
  }, [dataToShow]);

  // Helper function to chunk an array into groups of a specified size
  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };
  const determineItemsToMap = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 576) {
      return 2;
    } else if (viewportWidth < 768) {
      return 3;
    } else {
      return 4;
    }
  };
  return (
    <>
      {Products && Products.length > 0 && (
        <div className="row mt-3">
          <Carousel data-bs-theme="dark">
            {chunkArray(Products, determineItemsToMap()).map((group, index) => (
              <Carousel.Item key={index} interval={1500}>
                <div className="row m-0">
                  {group.map((product) => (
                    <HomeProductCard product={product} key={`${product.identity}}`}></HomeProductCard>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default OurProductSubcomponent;
