import React, { useEffect } from "react";
import "./styles/AgeConfirmation.css";
import logo from "./assets/logoVerticalWithoutBackground.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MyButton from "../reusableComponents/MyButton";
import { useFirebase } from "../context/firebase";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Loader from "../reusableComponents/Loader";
import MyToast from "../reusableComponents/Toast";
const LoginPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [LoaderState, setLoaderState] = useState(false);
  const [Email, setEmail] = useState("Enter Email...");
  const [Password, setPassword] = useState("Enter Password...");
  const firebase = useFirebase();

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.admin.adminIsLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/adminPage");
    }
  }, [isLoggedIn]);
  const submitHandler = async () => {
    setLoaderState(true);
    await firebase.loginAdminWithEmailAndPassword(Email, Password);
    if (!isLoggedIn) {
      setShowToast(true);
      setEmail("Enter Email...")
      setPassword("Enter Password...")
    }
    setLoaderState(false);
  };
  return (
    <>
      {LoaderState ? (
        <Loader text={"Logging You Up"}></Loader>
      ) : (
        <div className="AgeConfirmationPage row justify-content-center m-0">
          <div className="col align-self-center text-center">
            <MyToast
              text={"Ugh!! Wrong Password"}
              showHandler={showToast}
            ></MyToast>
            <img src={logo} className="AgeConfirmationPage-img mb-5" />
            <div className="row justify-content-center text-start ms-3">
              <div className="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                <Form>
                  <Row className="mb-3">
                    <div className="row">
                      <div className="col">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label
                            style={{ color: "#1396D8 ", fontWeight: "700" }}
                          >
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{width:"100%"}}
                          />
                        </Form.Group>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col">
                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label
                            style={{ color: "#1396D8 ", fontWeight: "700" }}
                          >
                            Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder={Password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </Row>
                </Form>
                <MyButton text={"Login"} handler={submitHandler}></MyButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
