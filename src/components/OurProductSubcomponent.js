import React, { useEffect, useState } from "react";
import HomeProductCard from "./HomeProductCard";
import Slider from "../reusableComponents/Slider";

const OurProductSubcomponent = ({ dataToShow }) => {
  const [Products, setProducts] = useState(null);
  useEffect(() => {
    setProducts(dataToShow);
  }, [dataToShow]);

  return (
    <>
      {Products && Products.length > 0 && (
        <Slider
          Components={Products.map((product) => (
            <HomeProductCard
              product={product}
              key={`${product.identity}}`}
            ></HomeProductCard>
          ))}
        />
      )}
    </>
  );
};

export default OurProductSubcomponent;
