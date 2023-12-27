import React from "react";
import "./styles/AgeConfirmation.css";
import logo from "./assets/logoVerticalWithoutBackground.png";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { BLUE, WHITE } from "../values/Colors";
import { AGE_CONFIRMATION_QUESTION } from "../values/Strings";

const AgeConfirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="AgeConfirmationPage row justify-content-center m-0">
      <div className="col align-self-center text-center ageconfirmationtext">
        <img src={logo} className="AgeConfirmationPage-img mb-5" />=
        <p style={{color:WHITE}}>{AGE_CONFIRMATION_QUESTION}</p>
        <ButtonGroup aria-label="Basic example" className="buttonGroup">
          <Button
            style={{color:BLUE}}
            onClick={() => { navigate("/home") }}
          >
            <p style={{color:WHITE}} className="m-0">Yes</p>
          </Button>
          <Button style={{color:BLUE}} href="https://www.google.com/">
            <p className="m-0" style={{color:WHITE}}>No</p>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default AgeConfirmation;
