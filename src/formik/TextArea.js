import React, { useEffect,useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styles from './styles/Textarea.module.css';

const TextArea = (props) => {
  const { label, name, interfaceDetails,totalCharacters,height, ...rest } = props;
  const { labelDesign, fieldDesign, inputDesign } = interfaceDetails;

  const [textColorRed, settextColorRed] = useState(false);
  useEffect(()=>{
  },[textColorRed])
  return (
    <div className={`form-control row ${styles.textAreaComponentMain} m-0`} style={inputDesign}>
      <div className="col-12 p-0">
        <label htmlFor={name} style={labelDesign} className={`form-control row col-10 ${styles.textAreaComponentLabel}`}>{label}</label>
      </div>
      <Field as="textarea" id={name} name={name} {...rest} style={{...fieldDesign,height}} placeholder={`Enter ${label}`} className={`form-control row col-10 ${styles.textAreaComponentField}`}/>
      <ErrorMessage name={name} component={TextError} />
      <div className={`col-12 text-end ${totalCharacters?"d-block":"d-none"}`}>
      <p style={textColorRed ? { color: "red" } : {}} className={`${styles.numberOfCharacters} m-0`}>
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

export default TextArea;
