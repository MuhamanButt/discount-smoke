
import { SET_PRODUCT_INFO } from "./ProductInfoTypes";


const initialState = {
  productInfo:{}
};

const productInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_INFO:
      return {
        ...state,
        productInfo: action.payload,
      };
      default :
      return state
  }
};

export default productInfoReducer