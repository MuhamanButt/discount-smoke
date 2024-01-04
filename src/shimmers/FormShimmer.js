import React from "react";
import {
  ShimmerTitle,
  ShimmerThumbnail,
  ShimmerText,
  ShimmerButton,
} from "react-shimmer-effects";
import styles from "./productCardShimmer.module.css";

const FormShimmer = () => {
  return (
    <div>
      <ShimmerTitle line={1} className={styles.shimmerMarginBottomTen}/>
      <ShimmerThumbnail height={40} />
      <ShimmerTitle line={1} className={styles.shimmerMarginBottomTen}/>
      <ShimmerThumbnail height={120} />
      <ShimmerTitle line={1} className={styles.shimmerMarginBottomTen}/>
      <ShimmerThumbnail height={40} />
      <ShimmerTitle line={1} className={styles.shimmerMarginBottomTen}/>
      <ShimmerThumbnail height={90} />
      <ShimmerTitle line={1} className={styles.shimmerMarginBottomTen}/>
      <ShimmerThumbnail height={40} />
      <ShimmerButton size="md" />
      <ShimmerButton size="md" />
      <ShimmerButton size="md" />
    </div>
  );
};

export default FormShimmer;
