import { SET_SELECTED_CATEGORY } from "./SelectedCategoryTypes";

export const setSelectedCategory = (category) => {
  return {
    type: SET_SELECTED_CATEGORY,
    payload: category,
  };
};
