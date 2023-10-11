import { SET_SEARCHBAR_DATA } from "./SearchBarDataTypes";
const initialState = {
  productInfo:[]
};
const SearchBarDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SEARCHBAR_DATA:
        return {
          ...state,
          productInfo: action.payload,
        };
        default :
        return state
    }
  };
  
export default SearchBarDataReducer