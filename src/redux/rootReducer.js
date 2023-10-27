import { combineReducers } from "redux";
import adminReducer from "./Admin/adminReducer";
import productInfoReducer from "./ProductInfo/ProductInfoReducer";
import SearchBarDataReducer from "./SearchBarData/SearchBarDataReducer";
import newMessagesAvailableReducer from "./Messages/MessagesReducer";
import loginTimeReducer from "./LoginTime/LoginTimeReducer";
import offersReducer from "./Offers/OffersReducer";
import userEntranceTimeReducer from "./UserEntranceTime/UserEntranceTimeReducer";
const rootReducer = combineReducers({
  admin: adminReducer,
  productInfo: productInfoReducer,
  searchbarData: SearchBarDataReducer,
  newMessagesAvailable: newMessagesAvailableReducer,
  loginTime: loginTimeReducer,
  offers:offersReducer,
  userEntranceTime:userEntranceTimeReducer

});

export default rootReducer;
