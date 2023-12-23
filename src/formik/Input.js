import React, { useEffect,useState } from "react";
import { Field, ErrorMessage } from "formik";
import styles from './styles/Input.module.css'
import TextError from "./TextError";
const Input = (props) => {
  const { label, name, interfaceDetails,totalCharacters, ...rest } = props;
  const {labelDesign, fieldDesign, inputDesign} = interfaceDetails
  const [textColorRed, settextColorRed] = useState(false);
  useEffect(()=>{
  },[textColorRed])
  return (
    <div className={`form-control row ${styles.inputFormComponentMain} m-0`} style={inputDesign}>
      <div className="col-12 p-0">
        <label htmlFor={name} style={labelDesign} className={`form-control row col-10 ${styles.inputFormComponentLabel}`}>
          {label}
        </label>
      </div>
      <Field id={name} name={name} {...rest} style={fieldDesign} placeholder={`Enter ${label}`}className={`form-control row col-10 ${styles.inputFormComponentField}`}/>
      <ErrorMessage name={name} component={TextError} />
      <div className={`col-12 text-end p-2 ${totalCharacters?"d-block":"d-none"}`}>
      <p style={textColorRed ? { color: "red" } : {}} className={styles.numberOfCharacters}>
       {
         <Field name={name}>
           {({ field }) => {
             if (field.value.length > totalCharacters) settextColorRed(true);
             else {
               settextColorRed(false);
             }
             return `${field.value.length}/${totalCharacters}`;
           }}
         </Field>
       } characters</p>
      </div>
    </div>
  );
};

export default Input;

