import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Define a list of reducers you want to blacklist from persistence
const persistConfig = {
  key: "persist-store1",
  storage,
  blacklist: ["searchbarData","newMessagesAvailable"] // Exclude the "searchbarData" reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);
export default store;
export { persistor };
