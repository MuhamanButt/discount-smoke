import React from "react";
import Card from "react-bootstrap/Card";
import {
  ShimmerTitle,
  ShimmerThumbnail,
  ShimmerText,
  ShimmerButton
} from "react-shimmer-effects";
import styles from './productCardShimmer.module.css'
const ProductCardShimmer = () => {
  return (
      <div className="col-6 col-sm-4 col-lg-3 product-card-col px-1 px-lg-2">
        <Card
          style={{ width: "100%", height: "auto",textAlign:"center" }}
          className="product-card"
        >
          <ShimmerThumbnail height={120} className={styles.shimmerMarginBottomZero}/>
          <Card.Text className="product-card-brandName"></Card.Text>
         
          <Card.Body className="product-card-body d-flex flex-column justify-content-between">
          <ShimmerTitle line={1} />
            <ShimmerText line={3} gap={10}className={styles.shimmerMarginBottomZero}/>
          </Card.Body>
          <div className="row justify-content-center">
            <div className="col-11 text-center">
              <ShimmerButton size="md" />
            </div>
          </div>
        </Card>
      </div>
  );
};
export default ProductCardShimmer;
