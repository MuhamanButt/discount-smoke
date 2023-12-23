import React from "react";
import "./styles/ContactUs.css";
import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form } from "formik";
import FormikControl from '../formik/FormikControl'
import { useFirebase } from "../context/firebase";
import Loader from "../reusableComponents/Loader";
const ContactUs = ({modalInvoker}) => {
  const firebase = useFirebase();
  const [messageBeingSent, setmessageBeingSent] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    contactNo: "",
    description:"",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Enter valid email..."),
    contactNo: Yup.number().required("Enter valid Contact No...").typeError("Enter valid Contact No..."),
    description:Yup.string().required("Enter valid description...").max(600,"Description must be less than 600 characters"),
    name:Yup.string().required("Enter valid name...").max(20,"Name must be less than 20 characters"),
  });
  const onSubmit=async(values)=>{
    setmessageBeingSent(true)
    if (await firebase.addMessage(values.name,values.email,values.contactNo, values.description))
    modalInvoker("Message sent successfully!!",2000)
    else 
      modalInvoker("There is an error sending message",2000)
  
  setmessageBeingSent(false)
  }
  const interfaceDetails={
    inputDesign:{
      backgroundColor:"transparent",
      border:"none",
      padding :"0px"
    },
    fieldDesign:{
    },
    labelDesign:{
      color:"#1396D8",
      fontWeight:"700",
      fontSize:"20px",
      border:"none"
    }
  }
  return (
    <div className={`OurBrands overflow-x-hidden`} style={{ backgroundColor: "white" }}>
        <div className="row justify-content-center">
          <div className="col text-center">
            <h1 className="Heading">WANT A SPECIFIC PRODUCT?</h1>
          </div>
        </div>
        <div className="row m-0" data-aos="fade-left">
          <div className="col contactUs-description">
            If you want a specific product contact us we will order that for
            you.
          </div>
        </div>
        <div className="row m-0" data-aos="fade-left">
          <div className="col contactUs-description">
            We will contact you once shipment is arrived at the store.
          </div>
        </div>
       
        <div
          className="row justify-content-center m-0 mt-sm-3"
          style={{ backgroundColor: "white" }}
        >
          <div className="col-12">
          {messageBeingSent?<Loader height="150px"/>:
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnBlur={false}
              onSubmit={onSubmit}
            >
               {(formik) => (
              <Form className="row">
                <div className="col-5 p-1" data-aos="fade-right">
                  <FormikControl control="input" type="name" name="name" label="Name" interfaceDetails={interfaceDetails}/>
                  <FormikControl control="input" type="email" name="email" label="Email" interfaceDetails={interfaceDetails}/>
                  <FormikControl control="input" type="contactNo" name="contactNo" label="Contact No" interfaceDetails={interfaceDetails} />
                </div>
                <div className="col-7" data-aos="fade-left">
                  <FormikControl control="textarea" type="description" name="description" label="Description" interfaceDetails={interfaceDetails} totalCharacters={600}/>
                </div>

              <div className="row justify-content-center" data-aos="fade-left">
                <div className="col-12 col-md-6 mt-4 text-center">
                  <button type="submit" className="send-msg-btn" disabled={formik.isSubmitting}>Send Message</button>
                </div>
              </div>
              </Form>
               )}
            </Formik>}
          </div>
        </div>
    </div>
  );
};

export default ContactUs;
