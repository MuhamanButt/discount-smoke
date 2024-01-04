import React from 'react';
import ProductCardShimmer from './ProductCardShimmer'; // Import the ProductCardShimmer component

const ProductCardPageShimmer = ({ numberOfItems }) => {
  // Create an array with the specified number of items
  const shimmerItems = Array.from({ length: numberOfItems }, (_, index) => (
    <ProductCardShimmer key={index} />
  ));

  return (
    <div className="row m-0 overflow-x-hidden px-3 px-md-0">
      {shimmerItems}
    </div>
  );
};

export default ProductCardPageShimmer;
