import React, { useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import styles from './styles/Input.module.css'
import TextError from "./TextError";
const Input = (props) => {
  const { label, name, interfaceDetails,...rest } = props;
  const {labelDesign, fieldDesign, inputDesign} = interfaceDetails
  return (
    <div
      className={`form-control row ${styles.inputFormComponentMain} m-0`}
      style={inputDesign}>
      <div className="col-12 p-0">
        <label htmlFor={name} style={labelDesign} className={`form-control row col-10 ${styles.inputFormComponentLabel}`}>
          {label}
        </label>
      </div>
      <Field id={name} name={name} {...rest} style={fieldDesign} placeholder={`Enter ${label}`}className={`form-control row col-10 ${styles.inputFormComponentField}`}/>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;

