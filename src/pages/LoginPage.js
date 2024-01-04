import React, { useEffect,useState } from "react";
import logo from "../assets/logoVerticalWithoutBackground.png";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { Formik, Form } from "formik";
import FormikControl from '../formik/FormikControl'
import { useSelector } from "react-redux";
import Loader from "../reusableComponents/Loader";
import CustomModal from "../utils/Modal";
import loginImage from "../assets/loginpage.webp";
import "./styles/LoginPage.css";
import "./styles/AgeConfirmation.css";
import { LOGIN_PAGE_SCHEMA } from "../values/ValidationSchemas";
import { LIGHT_BLUE } from "../values/Colors";
import { LOGIN_PAGE_INITIAL_VALUES } from "../values/InitialValues";
import { LOGIN_PAGE_INTERFACE } from "../values/InterfaceDetails";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [LoaderState, setLoaderState] = useState(false);
  const isLoggedIn = useSelector((state) => state.admin.adminIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/adminPage");
    }
  }, [isLoggedIn]);


  const onSubmit = async(values) => {
    setLoaderState(true);
    await firebase.loginAdminWithEmailAndPassword(values.email, values.password);
    !isLoggedIn ? setShowToast(true) : setLoaderState(false);
  };
  
  const interfaceDetails=LOGIN_PAGE_INTERFACE
  const initialValues = LOGIN_PAGE_INITIAL_VALUES
  const validationSchema = () => LOGIN_PAGE_SCHEMA
  return (
      <div className="row m-0">
        <div className="col-6 p-0 d-none d-md-block">
          <img src={loginImage} alt="" className="loginImage" />
        </div>
        <div className="col-12 col-md-6 p-0">
          {LoaderState ? (
            <Loader text={"Logging You Up"}/>
          ) : (
            <div className="AgeConfirmationPage row justify-content-center m-0">
              <div className="col text-center mainCol">
                <div className="row d-md-none">
                  <div className="col-12 loginImageUnderMD p-0">
                    <img src={loginImage} alt="" />
                  </div>
                </div>
                {showToast && (<CustomModal text={"Oops! Incorrect password. Please try again."} timer={3000} imageID={"ERR"}/>)}
                <img src={logo} className="AgeConfirmationPage-img mb-5" />
                <div className="row justify-content-center text-start ms-3">
                  <div className="col-12 col-sm-10 align-self-center">
                  <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      validateOnBlur={false}
                      onSubmit={onSubmit}
                    >
                      {(formik) => (
                        <Form className="row">
                          <FormikControl control="input" type="email" name="email" label="Email" interfaceDetails={interfaceDetails}/>
                          <FormikControl control="input" type="password" name="password" label="Password" interfaceDetails={interfaceDetails}/>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-5 text-center">
                               <button type="submit" className="login-page-buttons">Login</button>
                            </div>
                            <div className="col-5  text-center">
                               <button onClick={() => {navigate("/home")}} className="login-page-buttons">Home</button>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default LoginPage;
