
import { SET_PRODUCT_INFO } from "./ProductInfoTypes";

export const setProductInfo = (productInfo) => {
  return {
    type: SET_PRODUCT_INFO,
    payload:productInfo
  };
};
