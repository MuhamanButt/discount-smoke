import React from "react";
import "./styles/ContactUs.css";
import { useState } from "react";
import { Formik, Form } from "formik";
import FormikControl from '../formik/FormikControl'
import { useFirebase } from "../context/firebase";
import Loader from "../reusableComponents/Loader";
import { CONTACT_US_DESCRIPTION, CONTACT_US_WANT_PRODUCT } from "../values/Strings";
import { CONTACT_US_SEND_MESSAGE_SCHEMA } from "../values/ValidationSchemas";
import { CONTACT_US_INTERFACE } from "../values/InterfaceDetails";
import { CONTACT_US_INITIAL_VALUES } from "../values/InitialValues";
import { Button, notification, Space } from 'antd';

const ContactUs = () => {
  const firebase = useFirebase();
  const [messageBeingSent, setmessageBeingSent] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type,title,description) => {
    api[type]({
      message: title,
      description:description,
        placement:"top"
    });
  };

  
  const onSubmit = async (values) => {
    setmessageBeingSent(true);
    if (await firebase.addMessage(values.name, values.email, values.contactNo, values.description))
       openNotificationWithIcon('success',"Success :","Message sent successfully!!")
    else
      openNotificationWithIcon('error',"Error :","There is an error sending the message.Please try again !!")

    setmessageBeingSent(false);
  };

  const interfaceDetails = CONTACT_US_INTERFACE
  const initialValues = CONTACT_US_INITIAL_VALUES
  const validationSchema = () => CONTACT_US_SEND_MESSAGE_SCHEMA

  return (
    <div className={`OurBrands overflow-x-hidden`} style={{ backgroundColor: "white" }}>
      <div className="row justify-content-center">
        <div className="col text-center">
          <h1 className="Heading">{CONTACT_US_WANT_PRODUCT}</h1>
        </div>
      </div>
      <div className="row m-0" data-aos="fade-left">
        <div className="col contactUs-description">
          {CONTACT_US_DESCRIPTION}
        </div>
      </div>
      <div
        className="row justify-content-center m-0 mt-sm-3"
        style={{ backgroundColor: "white" }}
      >
        <div className="col-12">
        {contextHolder}
          {messageBeingSent ? <Loader height="150px" /> :
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnBlur={false}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return <Form className="row">
                  <div className="col-5 p-1" data-aos="fade-right">
                    <FormikControl control="input" type="name" name="name" label="Name" interfaceDetails={interfaceDetails} />
                    <FormikControl control="input" type="email" name="email" label="Email" interfaceDetails={interfaceDetails} />
                    <FormikControl control="input" type="contactNo" name="contactNo" label="Contact No" interfaceDetails={interfaceDetails} />
                  </div>
                  <div className="col-7" data-aos="fade-left">
                    <FormikControl control="textarea" type="description" name="description" label="Description" interfaceDetails={interfaceDetails} totalCharacters={600} height={"200px"} />
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-6 mt-4 text-center contact-us-submit-button">
                      <Button htmlType="submit" type="success" disabled={formik.isSubmitting} >Send Message</Button>
                    </div>
                  </div>
                </Form>
              }}
            </Formik>}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
