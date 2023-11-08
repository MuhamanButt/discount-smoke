import { SET_SELECTED_CATEGORY } from "./SelectedCategoryTypes";

const initialState = {
    category: {}
  };
  
  const selectedCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SELECTED_CATEGORY:
        return {
          ...state,
          category: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default selectedCategoryReducer;
  