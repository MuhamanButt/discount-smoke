import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
const FormikContainer = () => {
  const dropdownOptions = [
    { key: "Select an Option", value: "" },
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];
  
  const radioOptions = [
    { key: "Option 1", value: "roption1" },
    { key: "Option 2", value: "roption2" },
    { key: "Option 3", value: "roption3" },
  ];
  const checkboxOptions = [
    { key: "Option 1", value: "coption1" },
    { key: "Option 2", value: "coption2" },
    { key: "Option 3", value: "coption3" },
  ];
  const initialValues = { 
    email: "", 
    description: "", 
    selectOption: "", 
    radioOptions: "", 
    checkboxOptions: [],
    birthDate:null
    };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    selectOption: Yup.string().required("Required"),
    radioOptions: Yup.string().required("Required"),
    checkboxOptions: Yup.array().required("Required"),
    birthDate: Yup.date().required("Required").nullable(),
  });
  
  const onSubmit = (values) => console.log("form data", values);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl control="input" type="email" name="email" label="email"/>
          <FormikControl control="select" options={dropdownOptions} name="selectOption" label="Select a topic"/>
          <FormikControl control="textarea" type="description" name="description" label="description"/>
          <FormikControl control='radio' label='Radio Topic' name={'radioOptions'} options={radioOptions}/>
          <FormikControl control='checkbox' label='Checkbox Topic' name='checkboxOptions' options={checkboxOptions} />
          <FormikControl control='date' label='Pick a Date' name='birthDate'></FormikControl>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
