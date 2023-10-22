import React from 'react';
import Card from 'react-bootstrap/Card';
import './styles/ProductPageSkeleton.css';
import { Button } from 'react-bootstrap';
import '../components/styles/HomeProductCard.css'
const ProductPageSkeleton = () => {
  const skeletonCards = [];

  for (let i = 0; i < 10; i++) {
    skeletonCards.push(
      <div key={i} className="col-6 col-sm-4 col-lg-3">
         <Card className="product-card mb-3">
          <div className="product-card-img skeleton-loading" style={{ height: '280px' }}></div>
          <Card.Body className="product-card-body d-flex flex-column justify-content-between">
            <Card.Title className="product-card-color skeleton-loading">
              <h4 className="product-card-heading" style={{ height: '15px' }}>
                <strong></strong>
              </h4>
            </Card.Title>
            <Card.Text className="product-card-brandName skeleton-loading"></Card.Text>
            <Card.Text className="product-card-description skeleton-loading"></Card.Text>
            <div className="row">
              <div className="col text-center">
                <Button className="product-card-btn skeleton-loading">View</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return <div className="row">{skeletonCards}</div>;
};

export default ProductPageSkeleton;
