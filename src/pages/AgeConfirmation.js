import React from "react";
import "./styles/AgeConfirmation.css";
import logo from "./assets/logoVerticalWithoutBackground.png";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AgeConfirmation = () => {
  const [userIsValid, setuserIsValid] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="AgeConfirmationPage row justify-content-center m-0">
      <div className="col align-self-center text-center ageconfirmationtext">
        <img src={logo} className="AgeConfirmationPage-img mb-5" />
        {userIsValid && (
          <p className=" color-red">
            You must be over the age of 21 to continue....
          </p>
        )}
        <p className="color-white">Are you over 21 years of Age?</p>
        <ButtonGroup aria-label="Basic example" className="buttonGroup">
          <Button
            className="color-blue"
            onClick={() => {
              setuserIsValid(false);
              navigate("/home");
            }}
          >
            <p className="color-white m-0">Yes</p>
          </Button>
          <Button className="color-blue" href="https://www.google.com/">
            <p className="color-white m-0">No</p>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default AgeConfirmation;
