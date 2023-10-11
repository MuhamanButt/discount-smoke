import React, { useEffect } from "react";
import Heading from "../reusableComponents/Heading";
import "./styles/ContactUs.css";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MyToast from "../reusableComponents/Toast";
import { useFirebase } from "../context/firebase";
const ContactUs = () => {
  const firebase=useFirebase();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Description, setDescription] = useState("");
  const [showToast1, setshowToast1] = useState(false);
  const [showToast2, setshowToast2] = useState(false);
  const [showToast3, setshowToast3] = useState(false);
  const nameHandler = (value) => {
    if (value.length < 30) {
      setName(value);
    }
  };
  const emailHandler = (value) => {
    setEmail(value);
  };
  const contactNoHandler = (value) => {
    setContactNo(value);
  };
  const descriptionHandler = (value) => {
    if (value.length < 1000) {
      setDescription(value);
    }
  };
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const SubmitHandler = async() => {
    if (validateEmail(Email)) {
      if (Email && ContactNo && Description && Name) {
        await firebase.addMessage(Name,Email,ContactNo,Description)
        setshowToast2(true);
      } else {
        setshowToast3(true);
      }
    } else {
      setshowToast1(true);
    }
  };
  return (
    <div className="OurBrands overflow-x-hidden" style={{ backgroundColor: "#efefef" }}>
      <div data-aos="fade-left">
      <Heading
        text={"WANT A SPECIFIC PRODUCT?"}
        backgroundColor={"#efefef"}
      ></Heading>
      <div className="row m-0">
        <div className="col contactUs-description">
          If you want a specific product contact us we will order that for you.
        </div>
      </div>
      <div className="row m-0">
        <div className="col contactUs-description">
          We will contact you once shipment is arrived at the store.
        </div>
      </div>

      <div
        className="row justify-content-center m-0 mt-sm-3"
        style={{ backgroundColor: "#efefef" }}
      >
        <div className="col-10">
          <Form>
            <MyToast
              text={"Please enter Valid Email!!"}
              showHandler={showToast1}
            ></MyToast>
            <MyToast
              text={"Message sent successfully!!"}
              showHandler={showToast2}
            ></MyToast>
            <MyToast
              text={"Please fill All Fields"}
              showHandler={showToast3}
            ></MyToast>
            <div className="row">
            <div className="col-5">
            <Form.Group className="mb-3">
              <Form.Label className="FormLabels c-formLabels">Name</Form.Label>
              <Form.Control
                className="c-formText"
                type="text"
                placeholder={"Enter Your Name..."}
                value={Name}
                onChange={(e) => nameHandler(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="FormLabels c-formLabels">Email</Form.Label>
              <Form.Control
                className="c-formText"
                type="text"
                placeholder={"Enter Your Email..."}
                value={Email}
                onChange={(e) => emailHandler(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="FormLabels c-formLabels">Contact No</Form.Label>
              <Form.Control
                className="c-formText"
                type="text"
                placeholder={"Enter Your Contact No..."}
                value={ContactNo}
                onChange={(e) => contactNoHandler(e.target.value)}
                required
              />
            </Form.Group>
            </div>
            <div className="col-7">
            <Form.Group className="mb-3">
              <Form.Label className="FormLabels c-formLabels">Description</Form.Label>
              <Form.Control
                className="c-formText"
                as="textarea"
                placeholder={"Enter Product Description..."}
                value={Description}
                style={{ height: "210px" }}
                onChange={(e) => descriptionHandler(e.target.value)}
                required
              />
            </Form.Group>
            </div>
            </div>
            
            
            
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <Button
                  onSubmit={SubmitHandler}
                  onClick={SubmitHandler}
                  className="send-msg-btn"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </Form>
          
        </div>
      </div></div>
    </div>
  );
};

export default ContactUs;
