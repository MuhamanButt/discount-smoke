import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { FirebaseProvider } from "./context/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import CloudinaryProvider from "./context/cloudinary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
    <CloudinaryProvider>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
      </CloudinaryProvider>
    </PersistGate>
  </Provider>
);

reportWebVitals();
