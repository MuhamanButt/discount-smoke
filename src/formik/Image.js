import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from './styles/Input.module.css';
import TextError from "./TextError";

const ImageInput = (props) => {
  const { formik, label, name, interfaceDetails, ...rest } = props;
  const { labelDesign, fieldDesign, inputDesign } = interfaceDetails;

  return (
    <div className={`form-control row mb-2 ${styles.inputFormComponentMain} m-0`} style={inputDesign}>
      <div className="col-12 p-0">
        <label htmlFor={name} style={labelDesign} className={`form-control row col-10 ${styles.inputFormComponentLabel}`}>
          {label}
        </label>
      </div>
      <input type="file" accept="image/*" required onChange={(e)=>{
        formik.setFieldValue(name,e.target.files[0])
      }}></input>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default ImageInput;
