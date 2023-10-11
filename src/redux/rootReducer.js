import { combineReducers } from "redux";
import adminReducer from "./Admin/adminReducer";
import productInfoReducer from "./ProductInfo/ProductInfoReducer";
import SearchBarDataReducer from "./SearchBarData/SearchBarDataReducer";
import newMessagesAvailableReducer from "./Messages/MessagesReducer";
const rootReducer = combineReducers({
  admin: adminReducer,
  productInfo:productInfoReducer,
  searchbarData:SearchBarDataReducer,
  newMessagesAvailable:newMessagesAvailableReducer
});

export default rootReducer;
