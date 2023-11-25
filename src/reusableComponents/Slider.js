import React, { useEffect } from "react";
import "./styles/Slider.css";
const Slider = ({ Components }) => {
  return (
    <div className="wrapper my-2">
      {Components.map((component, key) => (
        <div className="wrapper-item" id={key}>
          {component}
        </div>
      ))}
    </div>
  );
};

export default Slider;
