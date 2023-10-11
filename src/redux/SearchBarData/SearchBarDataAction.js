import { SET_SEARCHBAR_DATA } from "./SearchBarDataTypes";

export const setSearchBarData = (productInfo) => {
  return {
    type: SET_SEARCHBAR_DATA,
    payload:productInfo
  };
};
