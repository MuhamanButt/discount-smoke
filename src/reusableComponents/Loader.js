import React from "react";
import "./styles/Loader.css";

const Loader = ({ text, height = "100vh" }) => {
  return (
    <div>
      <div className="row justify-content-center loaderRow m-0" style={{height:height}}>
        <div className="col align-self-center text-center p-0">
          <div className="loader"></div>
          <p className="text-white mt-1">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
