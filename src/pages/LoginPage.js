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
import Loader from "../reusableComponents/Loader";
import MyToast from "../reusableComponents/Toast";
import { useDispatch } from "react-redux";
import { setLoginTime } from "../redux/LoginTime/LoginTimeAction";
import loginImage from "./assets/loginpage.png";
import "./styles/LoginPage.css";
const LoginPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [LoaderState, setLoaderState] = useState(false);
  const [Email, setEmail] = useState("Enter Email...");
  const [Password, setPassword] = useState("Enter Password...");
  const firebase = useFirebase();
  const dispatch = useDispatch();
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
      setEmail("Enter Email...");
      setPassword("Enter Password...");
    } else {
      console.log("user is logged in");
    }
    setLoaderState(false);
  };
  return (
    <>
      <div className="row m-0">
        <div className="col-6 p-0 d-none d-md-block">
          <img src={loginImage} alt="" className="loginImage" />
        </div>
        <div className="col-12 col-md-6 p-0">
          {LoaderState ? (
            <Loader text={"Logging You Up"}></Loader>
          ) : (
            <div className="AgeConfirmationPage row justify-content-center m-0">
              <div className="col  text-center mainCol">
                <div className="row d-md-none">
                  <div className="col-12 loginImageUnderMD p-0">
                    <img src={loginImage} alt="" />
                  </div>
                </div>
                <MyToast
                  text={"Ugh!! Wrong Password"}
                  showHandler={showToast}
                ></MyToast>
                <img src={logo} className="AgeConfirmationPage-img mb-5" />
                <div className="row justify-content-center text-start ms-3">
                  <div className="col-12 col-sm-10">
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
                                style={{ width: "100%" }}
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

                            <div className="row mt-3">
                              <div className="col-6 text-end">
                                <MyButton
                                  text={"Login"}
                                  handler={submitHandler}
                                  width={100}
                                ></MyButton>
                              </div>
                              <div className="col-6 text-start">
                                <MyButton
                                  text={"Home"}
                                  handler={() => {
                                    navigate("/home");
                                  }}
                                  width={100}
                                ></MyButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Row>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
