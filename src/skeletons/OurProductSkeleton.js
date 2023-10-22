import React from 'react';
import Card from 'react-bootstrap/Card';
import './styles/ProductPageSkeleton.css';
import { Button } from 'react-bootstrap';

const OurProductSkeleton = ({number}) => {
  const skeletonCards = [];

  for (let i = 0; i < number; i++) {
    skeletonCards.push(
        <div className="col-6 col-sm-4 col-md-3 mt-3" key={i}>
      <Card className="product-card">
          <Card.Img
            variant="top"
            className="product-card-img skeleton-loading"
           />

        <Card.Body className="product-card-body d-flex flex-column justify-content-between">
          <div className=' skeleton-loading'>
            <Card.Title className="product-card-color">
              <h4 className="product-card-heading skeleton-loading">
                
              </h4>
            </Card.Title>
            <Card.Text className="product-card-brandName skeleton-loading">
              
            </Card.Text>
            <Card.Text className="product-card-description skeleton-loading">
              
            </Card.Text>
          </div>
          <div className="text-center skeleton-loading">
            <Button className="product-card-btn skeleton-loading">View</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
     
    );
  }

  return <div className="row">{skeletonCards}</div>;
};

export default OurProductSkeleton;
