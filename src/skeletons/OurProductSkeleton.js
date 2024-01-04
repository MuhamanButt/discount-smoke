import React from 'react';
import Card from 'react-bootstrap/Card';
import './styles/ProductPageSkeleton.css';
import { Button } from 'react-bootstrap';
import ProductCardShimmer from '../shimmers/ProductCardShimmer';

const OurProductSkeleton = ({number}) => {
  const skeletonCards = [];

  for (let i = 0; i < number; i++) {
    skeletonCards.push(
        <ProductCardShimmer/>
    );
  }

  return <div className="row">{skeletonCards}</div>;
};

export default OurProductSkeleton;
