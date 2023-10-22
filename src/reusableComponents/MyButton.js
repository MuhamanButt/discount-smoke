import React, { useEffect } from "react";
import "./styles/MyButton.css";
import Button from "react-bootstrap/Button";
const MyButton = ({ outlined, text, handler, color,width }) => {
  return (
    <div>
      {outlined ? (
        <Button
          variant="outline-primary"
          style={{ color: "white" }}
          className={`MyButton ${width?(`w-${width}`):(``)}`}
          onClick={handler}
        >
          {text}
        </Button>
      ) : (
        <Button
          style={{ backgroundColor: color ? color : "#05225C" }}
          className={`MyButton ${width?(`w-${width}`):(``)}`}
          onClick={handler}
        >
          {text}
        </Button>
      )}
    </div>
  );
};

export default MyButton;
