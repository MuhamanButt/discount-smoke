import React from "react";
import "./styles/LoaderDark.css";

const LoaderDark = ({text,height}) => {
  return (
      <div className="row justify-content-center loaderRow m-0" style={{ height: height ? height : "" }}>
        <div className="col align-self-center text-center p-0">
          <div className="loaderDark"></div>
          <p className="text-black mt-1">{text}</p>
        </div>
      </div>
  );
};

export default LoaderDark;
