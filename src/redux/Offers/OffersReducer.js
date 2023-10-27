import { SET_OFFERS } from "./OffersTypes";
const initialState = {
  offers:{}
};

const offersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
      default :
      return state
  }
};

export default offersReducer