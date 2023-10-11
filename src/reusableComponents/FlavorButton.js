import React from "react";
import './styles/FlavorButton.css'
const FlavorButton = ({ flavor }) => {
 
  return (
    <span className=" flavor-btn" >
      {flavor}
    </span>
  );
};

export default FlavorButton;
